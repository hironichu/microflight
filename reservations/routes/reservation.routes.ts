import { helpers, httpErrors, Status } from "../deps.ts";

import * as reservationService from "./../services/reservations.service.ts";

import { Context, UserRole } from "./../types.ts";
import { hasUserRole } from "../helpers/roles.ts";

/**
 * get list of users
 * call by ADMIN
 */
const getReservations = (ctx: Context) => {
  const users = reservationService.getReservations();
  ctx.response.body = users;
};

/**
 * get user by id
 * call by ADMIN
 */
const getReservationById = (ctx: Context) => {
  const { id } = helpers.getQuery(ctx, { mergeParams: true });
  const user = reservationService.getReservationById(+id);
  ctx.response.body = user;
};

/**
 * update user
 * call by user himselft or ADMIN
 */
const updateReservation = async (ctx: Context) => {
  /** get user id from params */
  const params = helpers.getQuery(ctx, { mergeParams: true });
  const id = Number(params.id);

  /** auth user */
  const authUser = ctx.user;

  if (authUser) {
    if (id === authUser.id || hasUserRole(authUser, UserRole.ADMIN)) {
      const request = ctx.request;
      const userData = await (request.body()).value;
      const user = reservationService.updateReservation(+id, userData);
      ctx.response.body = user;
      return;
    }
  }

  throw new httpErrors.Forbidden("Forbidden user role");
};

/**
 * Delete user by admin user
 */
const deleteReservation = (ctx: Context) => {
  const { id } = helpers.getQuery(ctx, { mergeParams: true });
  reservationService.deleteReservation(+id);
  ctx.response.status = Status.NoContent;
};

export { deleteReservation, getReservationById, getReservations, updateReservation };
