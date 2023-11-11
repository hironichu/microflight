import { ClientSQLite, NessieConfig } from "../deps.ts";

const config: NessieConfig = {
  client: new ClientSQLite("./reservations.db"),
  migrationFolders: ["./migrations"],
  seedFolders: ["./db/seeds"],
};

export default config;
