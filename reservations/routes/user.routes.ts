import { helpers, httpErrors, Status } from "../deps.ts";

import * as userService from "./../services/user.service.ts";

import { Context, UserRole } from "./../types.ts";
import { hasUserRole } from "../helpers/roles.ts";

/**
 * get list of users
 * call by ADMIN
 */
const getUsers = (ctx: Context) => {
  const users = userService.getUsers();
  ctx.response.body = users;
};

/**
 * get user by id
 * call by ADMIN
 */
const getUserById = (ctx: Context) => {
  const { id } = helpers.getQuery(ctx, { mergeParams: true });
  const user = userService.getUserById(+id);
  ctx.response.body = user;
};

/**
 * update user
 * call by user himselft or ADMIN
 */
const updateUser = async (ctx: Context) => {
  /** get user id from params */
  const params = helpers.getQuery(ctx, { mergeParams: true });
  const id = Number(params.id);

  /** auth user */
  const authUser = ctx.user;

  if (authUser) {
    if (id === authUser.id || hasUserRole(authUser, UserRole.ADMIN)) {
      const request = ctx.request;
      const userData = await (request.body()).value;
      const user = userService.updateUser(+id, userData);
      ctx.response.body = user;
      return;
    }
  }

  throw new httpErrors.Forbidden("Forbidden user role");
};

/**
 * Delete user by admin user
 */
const deleteUser = (ctx: Context) => {
  const { id } = helpers.getQuery(ctx, { mergeParams: true });
  userService.deleteUser(+id);
  ctx.response.status = Status.NoContent;
};

export { deleteUser, getUserById, getUsers, updateUser };
