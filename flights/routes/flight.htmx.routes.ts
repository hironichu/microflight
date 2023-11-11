import { Context } from "../deps.ts";
import * as flightService from "../services/flights.service.ts";
import { EmptyFlight } from "../services/flights.service.ts";

/**
 * @name getFlights
 * @description Get all flights route
 * @param {Context} ctx
 * @returns {Promise<void>}
 */
const getFlights = async (ctx: Context): Promise<void> => {
    const flights = await flightService.getFlights();
    ctx.render("flights.html", {
        flights: flights
    });
}

/**
 * @name getFlight
 * @description Get a flight by id route
 * @param {Context} ctx
 * @returns {Promise<void>}
 */
const getFlight = async (ctx: Context) => {
    const params = ctx.request.url.pathname.split("/");
    const id = params[params.length - 1];
    if (!id) {
        ctx.render("flights.html", {
            flights: await flightService.getFlights()
        });
        return;
    }
    const flight = await flightService.getFlightById(id);
    ctx.render("flights.html", {
        flights: flight
    });
}

/**
 * @name createFlight
 * @description Create a flight route
 * @param {Context} ctx
 * @returns {Promise<void>}
 */
const createFlight = async (ctx: Context): Promise<void> => {
    const body = await ctx.request.body().value;
    const id = body.get("id");
    const flightNumber = body.get("flightNumber");
    const origin = body.get("origin");
    const destination = body.get("destination");
    const date = body.get("date");
    const sieges = body.get("sieges");
    const company = body.get("company");
    const modele = body.get("modele");
    if (id) {
        await flightService.updateFlight(id, {flightNumber, origin, destination, date, sieges, informationAeroplane: {company, modele}});
    } else {
        await flightService.createFlight({flightNumber, origin, destination, date, sieges, informationAeroplane: {company, modele}});
    }
    ctx.render("flights.html", {
        flights: await flightService.getFlights()
    });
}

const flightFormHandler = async (ctx: Context) => {
    const params = ctx.request.url.pathname.split("/");
    const id = params[params.length - 1];

    const flight = id ? await flightService.getFlightById(id) : EmptyFlight;
    ctx.render("flight-form.html", flight as object);
} 

const deleteFlight = async (ctx: Context) => {
    const params = ctx.request.url.pathname.split("/");
    const id = params[params.length - 1];

    if (!id) {
        ctx.render("flights.html", {
            flights: await flightService.getFlights()
        });
        return;
    }
    await flightService.deleteFlight(id);
    ctx.render("flights.html", {
        flights: await flightService.getFlights()
    });
}
const searchFlight = async (ctx: Context) => {
    const key = ctx.request.url.searchParams.get("key");
    ctx.render("flights.html", {
        flights: await flightService.searchFlight(key ?? "")
    })
}
export { getFlights, getFlight, createFlight, flightFormHandler, deleteFlight, searchFlight};