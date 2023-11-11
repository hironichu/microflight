import Kv from "../db.ts";
import { Flight } from "../types/flights.type.ts";

export async function searchFlights(key: string) {
  const flights = await getFlights();
  return flights
    .filter((it) => it.flightNumber.indexOf(key) > -1);
}

export async function getFlight(id: string) {
  return (await Kv.get<Flight>(["flights", id])).value;
}

export async function getFlights() {
  const flights = [] as Flight[];

  const entries = Kv.list<Flight>({ prefix: ["flights"] });
  for await (const entry of entries) {
    flights.push(entry.value);
  }
  return flights;
}

export async function createFlight(post: Partial<Flight>) {
  const id = crypto.randomUUID();
  await Kv.set(["flights", id], { ...post, id });
  return id;
}

export async function updateFlight(
  id: string,
  data: Partial<Flight>,
): Promise<Flight | null> {
  await Kv.set(["flights", id!], { ...data });
  return await getFlight(id);
}

export async function deleteFlight(id: string) {
  return await Kv.delete(["flights", id]);
}
