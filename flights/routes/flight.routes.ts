import { Context } from "../deps.ts";
import * as flightService from "../services/flights.service.ts";

/**
 * @name getFlights
 * @description Get all flights route
 * @param {Context} ctx
 * @returns {Promise<void>}
 */
const getFlights = async (ctx: Context) => {
    const flights = await flightService.getFlights();
    ctx.response.body = flights;
}

/**
 * @name getFlight
 * @description Get a flight by id route
 * @param {Context} ctx
 * @returns {Promise<void>}
 */
const getFlight = async (ctx: Context) => {
    const body = await ctx.request.body().value;
    const id = body.get("id");
    const flight = await flightService.getFlightById(id);
    ctx.response.body = flight;
}

/**
 * @name createFlight
 * @description Create a flight route
 * @param {Context} ctx
 * @returns {Promise<void>}
 */
const createFlight = async (ctx: Context): Promise<void> => {
    const body = await ctx.request.body().value;
    const flightNumber = body.get("flightNumber");
    const origin = body.get("origin");
    const destination = body.get("destination");
    const date = body.get("date");
    const sieges = body.get("sieges");
    const company = body.get("company");
    const modele = body.get("modele");
    await flightService.createFlight({flightNumber, origin, destination, date, sieges, informationAeroplane: {company, modele}});
    ctx.response.body = await flightService.getFlights();
}
const updateFlight = async (ctx: Context) => {
    const body = await ctx.request.body().value;
    const id = body.get("id");
    const flightNumber = body.get("flightNumber");
    const origin = body.get("origin");
    const destination = body.get("destination");
    const date = body.get("date");
    const sieges = body.get("sieges");
    const company = body.get("company");
    const modele = body.get("modele");
    await flightService.updateFlight(id, {flightNumber, origin, destination, date, sieges, informationAeroplane: {company, modele}});
    ctx.response.body = await flightService.getFlights();
}

const deleteFlight = async (ctx: Context) => {
    const body = await ctx.request.body().value;
    const {id} = body.get("id");
    await flightService.deleteFlight(id);
    ctx.response.body = await flightService.getFlights();
}

const searchFlight = async (key: string) => {
    return await flightService.searchFlight(key);
}

export { getFlights, getFlight, createFlight, updateFlight, deleteFlight};