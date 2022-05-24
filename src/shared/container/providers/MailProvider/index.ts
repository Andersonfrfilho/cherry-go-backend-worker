import { container } from "tsyringe";

import { MailProviderInterface } from "@shared/container/providers/MailProvider/Mail.provider.interface";

import { SesAwsMailProvider } from "./implementations/SesAwsMail.provider";

const mailProvider = {
  ses: container.resolve(SesAwsMailProvider),
};

container.registerInstance<MailProviderInterface>(
  "MailProvider",
  mailProvider[`${process.env.MAIL_PROVIDER}`]
);
