// import { Router, Context, send } from "./deps.ts";
// import { Reservation, ReservationStatus } from "./types/reservation/reservation-create.ts";

// import { getReservation, EmptyReservation, getReservations, createReservation, updateReservation, deleteReservation, searchReservation } from "./services/reservations.service.ts";

// async function getReservationHandler(ctx: Context) {
//   ctx.render("flights.html", {
//     flights: await getReservations()
//   });
// }

// async function CgetFlightHandler(ctx: Context) {
//  ctx.response.body = await getReservations()
// }

// async function searchReservationHandler(ctx: Context) {
//   const key = ctx.request.url.searchParams.get("key");
//   ctx.render("flights.html", {
//     flights: await searchReservation(key ?? "")
//   })
// }

// async function NsearchFlightHandler(ctx: Context) {
//     const key = ctx.request.url.searchParams.get("key");
//     return await searchReservation(key ?? "")
// }

// async function createReservationHandler(ctx: Context) {
//   const body = await ctx.request.body().value;
//   const id = body.get("id");
//   const userId = body.get("userId");
//   const date = body.get("date");
//   const idSiege = body.get("idSiege");
//   const idVol = body.get("idVol");
//   const changement = Date.now().toString();
//   const status = body.get("status");
//   if (id) {
//     updateReservation({
//       id: Number(id),
//       userId: userId ?? "",
//       date: date ?? "",
//       idSiege: idSiege ?? "",
//       idVol: idVol ?? "",
//       statutText: status ?? ReservationStatus.PENDING,
//       changement: changement ?? ""
//     });
//   } else {
//     createReservation({
//       id: null,
//       userId: userId ?? "",
//       date: date ?? "",
//       idSiege: idSiege ?? "",
//       idVol: idVol ?? "",
//       changement: changement ?? ""
//     });
//   }

//   ctx.render("reservations.html", {
//     flights: getReservations()
//   });
// }




  