import { AbstractSeed, Info, ClientSQLite } from "https://deno.land/x/nessie@2.0.11/mod.ts";

export default class extends AbstractSeed<ClientSQLite> {
    /** Runs on seed */
    async run(info: Info): Promise<void> {
    }
}
