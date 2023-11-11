import { Router } from "../deps.ts";

import * as viewsRoutes from "./view.routes.ts";
import * as flightRoutes from "./flight.routes.ts";
import * as flightHtmxRoutes from "./flight.htmx.routes.ts";
const router: Router = new Router();

/// Views
router
    .get("/", ctx => ctx.render("index.html"))
    .get("/main.css", viewsRoutes.cssHandler)
    .get("/hero.jpg", viewsRoutes.imgHandler)

/// Flights API
router
    .get("/flights", flightRoutes.getFlights)
    .get("/flight/:id", flightRoutes.getFlight)
    .post("/flights", flightRoutes.createFlight)
    .put("/flight/:id", flightRoutes.updateFlight)
    .delete("/users/:id", flightRoutes.deleteFlight);

/// Flights API HTMX
router
    .get("/x/flights", flightHtmxRoutes.getFlights)
    .get("/x/flights/:id", flightHtmxRoutes.getFlight)
    .get("/x/flight/form/:id?", flightHtmxRoutes.flightFormHandler)
    .post("/x/flights", flightHtmxRoutes.createFlight)
    .get("/x/search", flightHtmxRoutes.searchFlight)
    .delete("/x/flights/:id", flightHtmxRoutes.deleteFlight);
export default router;