
import db from "../db/db.ts";
import { Reservation, ReservationInfo  } from "../types.ts";
export const EmptyUser = {
    nom: "",
    prenom: "",
    email: "",
} as const;

export function getReservations(): Reservation[] {
    const stmt = db.prepare("SELECT * FROM reservations");
    const [reservations] = stmt.values<Reservation[]>();
    stmt.finalize();

    return reservations;
}

export function searchReservation(key: string): Reservation[] {
    const stmt = db.prepare("SELECT * FROM reservations WHERE id LIKE ? OR user.prenom LIKE ? OR user.nom LIKE ? OR user.email LIKE ? OR date LIKE ? OR idSiege LIKE ? OR idVol LIKE ? OR changement LIKE ?");
    const [reservations] = stmt.values<Reservation[]>([key, key, key, key, key]);
    stmt.finalize();

    return reservations;
}

export function getReservation(id: number): Reservation | undefined {
    const stmt = db.prepare("SELECT * FROM reservation WHERE id = ?");
    const reservation = stmt.get<ReservationInfo>(id);
    stmt.finalize();
    return reservation;
}

export function createReservation<T extends Pick<Reservation, "user" | "idSiege" | "idVol" >>(reservation: T): void {
    
    const stmt = db.prepare("INSERT INTO reservations (user, idSiege, idVol) VALUES (?, ?, ?, ?, ?)");
    // stmt.
    const transaction = db.transaction((data: T) => {
        stmt.bind(data.user, data.idSiege, data.idVol);
        stmt.run();
    })
    transaction(reservation);
    stmt.finalize();

}

export function updateReservation<T extends Pick<ReservationInfo, "user" | "idSiege" | "idVol" | "updatedAt" >>(id: number, reservation: T): T {
    const stmt = db.prepare("UPDATE reservations SET user = ?, idSiege = ?, idVol = ? WHERE id = ?");
    const transaction = db.transaction((data: T) => {
        stmt.bind(data.user, data.idSiege, data.idVol, data.updatedAt, id);
        stmt.run();
    })
    transaction(reservation);
    stmt.finalize();
    return reservation;
}

export function deleteReservation(id: number): ReservationInfo | undefined {
    const stmt = db.prepare("DELETE FROM users WHERE id = ?");
    const transaction = stmt.get<ReservationInfo>(id);
    stmt.finalize();
    return transaction;
}
