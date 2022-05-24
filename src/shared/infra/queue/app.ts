import "dotenv/config";
import "reflect-metadata";
import express from "express";
import { Kafka } from "kafkajs";

import { config } from "@config/environment";
import { SesAwsMailProvider } from "@shared/container/providers/MailProvider/implementations/SesAwsMail.provider";
import { SnsAwsSmsProvider } from "@shared/container/providers/SmsProvider/implementations/SnsAwsSms.provider";

import { version, name } from "../../../../package.json";
import { router } from "../http/routes";

const port = Number(process.env.PORT);

const app = express();

const kafka = new Kafka({
  clientId: "cherry-go-worker",
  brokers: [config.queue.broker.base_url],
});

const consumer_send_email = kafka.consumer({
  groupId: `send-email-consumer${Math.random()}`,
});

const consumer_send_sms = kafka.consumer({
  groupId: `send-sms-consumer${Math.random()}`,
});

const emailProvider = new SesAwsMailProvider();
const smsProvider = new SnsAwsSmsProvider();
async function run() {
  await consumer_send_email.connect();
  await consumer_send_email.subscribe({ topic: config.mail.queue.topic });
  await consumer_send_email.run({
    eachMessage: async ({ topic, partition, message }) => {
      const prefix = `${topic}[${partition} | ${message.offset}] / ${message.timestamp}`;
      console.log(` - ${prefix} ${message.key}#${message.value}`);
      const { to, email_type, variables } = JSON.parse(String(message.value));

      await emailProvider.sendMail({
        email_type,
        to,
        variables,
      });
    },
  });

  await consumer_send_sms.connect();
  await consumer_send_sms.subscribe({ topic: config.sms.queue.topic });
  await consumer_send_sms.run({
    eachMessage: async ({ topic, partition, message }) => {
      const prefix = `${topic}[${partition} | ${message.offset}] / ${message.timestamp}`;
      console.log(` - ${prefix} ${message.key}#${message.value}`);
      const { to, from, text, subject } = JSON.parse(String(message.value));
      await smsProvider.sendSms({ from, text, to, subject });
    },
  });
}

app.use(router);

app.listen(port, () => {
  run().catch(console.error);
  console.log(
    `Application: ${name} \n port: ${port} \n version: ${version} \n Server is running!`
  );
});
