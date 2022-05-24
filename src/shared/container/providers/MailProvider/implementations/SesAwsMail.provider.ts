import { SES } from "aws-sdk";
import fs from "fs";
import handlebars from "handlebars";
import nodemailer, { Transporter } from "nodemailer";
import { resolve } from "path";
import { injectable } from "tsyringe";

import { SendMailDTO } from "@shared/container/providers/MailProvider/dtos";
import {
  MailSubject,
  MailType,
} from "@shared/container/providers/MailProvider/enums/MailType.enum";
import { MailProviderInterface } from "@shared/container/providers/MailProvider/Mail.provider.interface";

@injectable()
export class SesAwsMailProvider implements MailProviderInterface {
  private client: Transporter;
  constructor() {
    this.createClient();
  }

  private async createClient() {
    try {
      this.client = nodemailer.createTransport({
        SES: new SES({
          apiVersion: "2010-12-01",
          accessKeyId: process.env.AWS_SMTP_ACCESS_KEY_ID,
          secretAccessKey: process.env.AWS_SMTP_SECRET_ACCESS_KEY,
          region: process.env.AWS_DEFAULT_REGION,
        }),
      });
    } catch (err) {
      console.error(`EtherealMailProvider - Error:\n${err}`);
    }
  }

  async sendMail({ to, variables, email_type }: SendMailDTO): Promise<void> {
    const templatePath = resolve(
      __dirname,
      "..",
      "..",
      "MailProvider",
      "views",
      "emails",
      `${MailType[email_type]}.hbs`
    );
    const templateFileContent = fs.readFileSync(templatePath).toString("utf-8");

    const templateParse = handlebars.compile(templateFileContent);

    const templateHTML = templateParse(variables);

    const message = await this.client.sendMail({
      to,
      from: "Cherry-go <admin@cherry-go.com>",
      subject: MailSubject[email_type],
      html: templateHTML,
    });

    console.log("Message sent: %s", message.messageId);
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(message));
  }
}
