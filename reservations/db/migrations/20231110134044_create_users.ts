import {
    AbstractMigration,
    ClientSQLite,
    Info,
  } from "../../deps.ts";
  import Dex from "https://deno.land/x/dex@1.0.2/mod.ts";

  export default class extends AbstractMigration<ClientSQLite> {
    async up({ dialect }: Info): Promise<void> {
      const query = Dex({ client: dialect }).schema.createTable(
        "users",
        (table: any) => {
          table.bigIncrements("id").primary();
          table.string("prenom", 255).notNullable();
          table.string("non", 255).notNullable();
          table.string("email", 255).notNullable().unique();
          table.timestamps(undefined, true);
        },
      );
  
      await this.client.query(query);
  
    //   await this.client.query(
    //     'insert into users (prenom, non, email) values ("John", "Doe", "test@test.fr")'
    //   );
      const stmt = this.client.prepareQuery(
        "insert into users (prenom, non, email) values (?, ?, ?)",
      );
      stmt.execute(["John", "Doe", "test@free.fr"]);

      const res = await this.client.queryEntries("select * from users");
  
      for await (const row of res) {
        this.client.queryEntries(
          `update users set prenom = '${row.prenom}' where id = ${row.id}`,
        );
      }
    }
  
    async down({ dialect }: Info): Promise<void> {
      const query = Dex({ client: dialect }).schema.dropTable("users");
  
      this.client.queryEntries(query);
    }
  }