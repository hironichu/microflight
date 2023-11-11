
import { CreateUser } from "./user-create.ts";
import { UserRole } from "./user-role.ts";

/** Request body to create user */
export type UserInfo = CreateUser & {
  /** user roles */
  roles: [UserRole];
};