import {
    AbstractSeed,
    ClientPostgreSQL,
    Info,
  } from "../deps.ts";
  export default class extends AbstractSeed<ClientPostgreSQL> {
    async run({ dialect }: Info): Promise<void> {
      await this.client.queryArray("INSERT INTO table1 VALUES (1234)");
    }
  }