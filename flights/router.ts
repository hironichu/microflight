// import { Router, Context, send } from "./deps.ts";

// import { getFlight, EmptyFlight, getFlights, createFlight, updateFlight, deleteFlight, searchFlights } from "./services/service.ts";

// async function searchFlightHandler(ctx: Context) {
//   const key = ctx.request.url.searchParams.get("key");
//   ctx.render("flights.html", {
//     flights: await searchFlights(key ?? "")
//   })
// }

// async function createFlightHandler(ctx: Context) {
//   const body = await ctx.request.body().value;
//   const id = body.get("id");
//   const flightNumber = body.get("flightNumber");
//   const origin = body.get("origin");
//   const destination = body.get("destination");
//   const date = body.get("date");
//   const sieges = body.get("sieges");
//   const compagny = body.get("compagny");
//   const modele = body.get("modele");
//   if (id) {
//     await updateFlight({id, flightNumber, origin, destination, date, sieges, informationAeroplane: {compagny, modele}});
//   } else {
//     await createFlight({flightNumber, origin, destination, date, sieges, informationAeroplane: {compagny, modele}});
//   }

//   ctx.render("flights.html", {
//     flights: await getFlights()
//   });
// }

// async function flightFormHandler(ctx: Context) {
//   const {id} = ctx.params;
//   const flight = id ? await getFlight(id) : EmptyFlight;
//   ctx.render("flight-form.html", flight as object);
// }

// export default new Router()
//   .get("/", ctx => ctx.render("index.html"))
//   .get("/flights", CgetFlightHandler)
//   .get("/flight/:id?", NflightFormHandler)

//   .post("/flights", NcreateFlightHandler)
//   .delete("/flights/:id", NdeleteFlightHandler)

//   .get("/x/search", searchFlightHandler)
//   .get("/x/flights", getFlightHandler)
//   .get("/x/flight/form/:id?", flightFormHandler)
//   .post("/x/flights", createFlightHandler)
//   .delete("/x/flights/:id", deleteFlightHandler)

//   .get("/main.css", cssHandler)
//   .get("/hero.jpg", imgHandler);
