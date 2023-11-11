import "https://deno.land/std@0.205.0/dotenv/load.ts"

const Kv = await Deno.openKv(Deno.env.get("DENO_KV_URL")!);
export default Kv;