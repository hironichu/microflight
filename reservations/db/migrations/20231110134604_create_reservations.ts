import {
    AbstractMigration,
    ClientSQLite,
    Info,
  } from "../../deps.ts";
  import Dex from "https://deno.land/x/dex/mod.ts";
  let dex = Dex({client: "sqlite3"});

  export default class extends AbstractMigration<ClientSQLite> {
    async up({ dialect }: Info): Promise<void> {
      const query = dex({ client: dialect }).schema.createTable(
        "reservations",

        (table: any) => {
          table.increments("id").primary();
          table.integer("userId").unsigned().references("users.id").notNullable();
          table.string("idSiege", 255).notNullable();
          table.string("idVol", 255).notNullable();
          table.timestamps(undefined, true);
        },
      );

      this.client.execute(query);
    }
  
    async down({ dialect }: Info): Promise<void> {
      const query = Dex({ client: dialect }).schema.dropTable("users");
  
      await this.client.queryEntries(query);
    }
  }