import { UserInfo } from "../user/user-info.ts";
import { ReservationStatus } from "./reservation-info.ts";
export type Reservation  = {
    user: UserInfo["_id"];
    idSiege: string;
    idVol: string;
    createdAt?: Date;
    updatedAt?: Date;
}


export type ReservationInfo = Reservation & {
    /** user roles */
    statusText: typeof ReservationStatus[keyof typeof ReservationStatus];
};