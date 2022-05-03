import { Connection, createConnections } from "typeorm";

export default async (): Promise<Connection[]> => {
  return createConnections();
};
