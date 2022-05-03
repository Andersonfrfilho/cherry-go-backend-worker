import { container } from "tsyringe";

import { DateProviderInterface } from "@shared/container/providers/DateProvider/Date.provider.interface";
import { DateFnsProvider } from "@shared/container/providers/DateProvider/implementations/DateFns.provider";

const dateProvider = {
  dateFns: DateFnsProvider,
};

container.registerSingleton<DateProviderInterface>(
  "DateProvider",
  dateProvider[`${process.env.DATE_PROVIDER}`]
);
