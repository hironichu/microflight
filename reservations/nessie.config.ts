import {
    ClientSQLite,
    NessieConfig,
} from "https://deno.land/x/nessie@2.0.11/mod.ts";

const client = new ClientSQLite("./reservations.db");

/** This is the final config object */
const config: NessieConfig = {
    client,
    migrationFolders: ["./db/migrations"],
    seedFolders: ["./db/seeds"],
};

export default config;
