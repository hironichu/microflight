import * as reservationRepo from "./../repositories/reservation.repository.ts";
import { httpErrors } from "https://deno.land/x/oak@v5.0.0/mod.ts";

/**
 * get user by id
 */
export const getReservationById = (id: number) => {
  const user = reservationRepo.getReservation(id);
  if (!user) {
    throw new httpErrors.NotFound("User not found");
  }

  return user;
};

/**
 * get users list
 */
export const getReservations = () => {
  const users = reservationRepo.getReservations();
  return users;
};

/**
 * update user
 */
export const updateReservation = async (id: number, userData: any) => {
  // todo: validation
  try {
    const result = await reservationRepo.updateReservation(id, userData);
    if (result["affectedRows"]) {
      const user = reservationRepo.getReservation(id);
      if (user) {
        return user;
      }
    }
    throw new httpErrors.NotFound("User not found");
  } catch (err) {
    const { message } = err;
    if (message.match("email_unique")) {
      throw new httpErrors.BadRequest(
        `Already user exists with email ${userData.email}`,
      );
    }
    throw err;
  }
};

/**
 * delete user
 */
export const deleteReservation = (id: number) => {
  // todo: catch db error
  const result = reservationRepo.deleteReservation(id);
  if (!result) {
    throw new httpErrors.NotFound("User not found");
  }
};