import { Flight } from "../types/flights.type.ts";
import { SeatStatus } from "../types/seats.type.ts";

export const EmptyFlight = {
  id: "",
  flightNumber: "",
  origin: "",
  destination: "",
  date: "",
  sieges: [
    { name: "A01", status: SeatStatus.AVAILABLE },
    { name: "A02", status: SeatStatus.AVAILABLE },
    { name: "A03", status: SeatStatus.AVAILABLE },
    { name: "A04", status: SeatStatus.AVAILABLE },
    { name: "A05", status: SeatStatus.AVAILABLE },
    { name: "A06", status: SeatStatus.AVAILABLE },
    { name: "A07", status: SeatStatus.AVAILABLE },
    { name: "A08", status: SeatStatus.AVAILABLE },
    { name: "A09", status: SeatStatus.AVAILABLE },
    { name: "A10", status: SeatStatus.AVAILABLE },
    { name: "B01", status: SeatStatus.AVAILABLE },
    { name: "B02", status: SeatStatus.AVAILABLE },
    { name: "B03", status: SeatStatus.AVAILABLE },
    { name: "B04", status: SeatStatus.AVAILABLE },
    { name: "B05", status: SeatStatus.AVAILABLE },
    { name: "B06", status: SeatStatus.AVAILABLE },
    { name: "B07", status: SeatStatus.AVAILABLE },
    { name: "B08", status: SeatStatus.AVAILABLE },
    { name: "B09", status: SeatStatus.AVAILABLE },
    { name: "B10", status: SeatStatus.AVAILABLE },
    { name: "C01", status: SeatStatus.AVAILABLE },
    { name: "C02", status: SeatStatus.AVAILABLE },
    { name: "C03", status: SeatStatus.AVAILABLE },
    { name: "C04", status: SeatStatus.AVAILABLE },
    { name: "C05", status: SeatStatus.AVAILABLE },
    { name: "C06", status: SeatStatus.AVAILABLE },
    { name: "C07", status: SeatStatus.AVAILABLE },
    { name: "C08", status: SeatStatus.AVAILABLE },
    { name: "C09", status: SeatStatus.AVAILABLE },
    { name: "C10", status: SeatStatus.AVAILABLE },
  ],
  informationAeroplane: {
    modele: "",
    company: "",
  },
} as Flight;

import * as flightsRepo from "./../repositories/flights.repository.ts";
import { httpErrors } from "https://deno.land/x/oak@v12.6.1/mod.ts";

/**
 * @name createFlight
 * @description Get Flight by id
 * @param {string} id
 * @returns {Flight}
 */
export const getFlightById = async (id: string): Promise<Flight | null> => {
  const user = await flightsRepo.getFlight(id);
  if (!user) {
    throw new httpErrors.NotFound(
      JSON.stringify({ message: "Flight not found" }),
    );
  }

  return user;
};

/**
 * @name getFlights
 * @description Get all flights
 * @returns {Flight[]}
 */
export const getFlights = async (): Promise<Flight[]> => {
  const users = await flightsRepo.getFlights();
  //log
  console.log(users);
  return users;
};

/**
 * @name updateFlight
 * @description Update a flight by id and flight data
 * @param {string} id
 * @param {Partial<Flight>} flightData
 * @returns {Flight}
 */
export const updateFlight = async (
  id: string,
  flightData: Partial<Flight>,
) => {
  const result = await flightsRepo.updateFlight(id, flightData);
  return result;
};

/**
 * @name deleteFlight
 * @description Delete a flight by id
 * @param {string} id
 * @returns {Promise<void>}
 */
export const deleteFlight = async (id: string): Promise<void> => {
    return await flightsRepo.deleteFlight(id);
};

export const createFlight = async (flightData: Partial<Flight>) => {
    flightData.sieges = EmptyFlight.sieges;
    const result = await flightsRepo.createFlight(flightData);
    return result;
}

export const searchFlight = async (key: string) => {
    return await flightsRepo.searchFlights(key ?? "");
}