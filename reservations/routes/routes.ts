import { Router } from "../deps.ts";
import { Context } from "./../types.ts";

import * as reservationRoutes from "./reservation.routes.ts";
import * as userRoutes from "./user.routes.ts";
import * as viewsRoutes from "./views.routes.ts";
const router: Router = new Router();

router
    .get("/", ctx => ctx.render("index.html"))
    .get("/main.css", viewsRoutes.cssHandler)
    .get("/hero.jpg", viewsRoutes.imgHandler)

// router
//   .post("/login", ...reservationRoutes.login)
//   .post("/register", ...reservationRoutes.register)
//   .post("/token", ...reservationRoutes.refreshToken);

router
  .get("/users",userRoutes.getUsers)
  .get("/users/:id", userRoutes.getUserById)
  .put("/users/:id", userRoutes.updateUser)
  .delete("/users/:id", userRoutes.deleteUser);
router
  .get("/reservations", reservationRoutes.getReservations)
  .get("/reservations/:id", reservationRoutes.getReservationById)
  .put("/reservations/:id", reservationRoutes.updateReservation)
  .delete("/reservations/:id", reservationRoutes.deleteReservation);

export { router };