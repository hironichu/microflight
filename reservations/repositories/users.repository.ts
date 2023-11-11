import db from "../db.ts";
import { UserInfo  } from "../types.ts";
export const EmptyUser = {
    nom: "",
    prenom: "",
    email: "",
} as const;

export function getUsers(): UserInfo[] {
    const stmt = db.prepare("SELECT * FROM users");
    const [users] = stmt.values<UserInfo[]>();
    stmt.finalize();

    return users;
}

export function searchUser(key: string): UserInfo[] {
    const stmt = db.prepare("SELECT * FROM users WHERE id LIKE ? OR nom LIKE ? OR prenom LIKE ? OR email LIKE ?");
    const [user] = stmt.values<UserInfo[]>([key, key, key, key, key]);
    stmt.finalize();

    return user;
}

export function getUser(id: number): UserInfo | undefined {
    const stmt = db.prepare("SELECT * FROM users WHERE id = ?");
    const users = stmt.get<Record<string, UserInfo>>(id);
    stmt.finalize();
    if (users) {
        return users.user;
    }
    return users
}

export function createUser<T extends Pick<UserInfo, 'nom' | "prenom" | "email">>(user: T): void {
    
    const stmt = db.prepare("INSERT INTO users (nom, prenom, email) VALUES (?, ?, ?)");
    const transaction = db.transaction((data: T) => {
        stmt.bind(data.nom, data.prenom, data.email);
        stmt.run();
    })
    transaction(user);
    stmt.finalize();

}

export function updateUser<T extends Pick<UserInfo, 'nom' | "prenom" | "email" >>(id: number, user: T): T {
    const stmt = db.prepare("UPDATE users SET nom = ?, prenom = ?, email = ? WHERE id = ?");
    const transaction = db.transaction((data: T) => {
        stmt.bind(data.nom, data.prenom, data.email, id);
        stmt.run();
    })
    transaction(user);
    stmt.finalize();
    return user;
}

export function deleteUser(id: number): UserInfo | undefined {
    const stmt = db.prepare("DELETE FROM users WHERE id = ?");
    const transaction = stmt.get<UserInfo>(id);
    stmt.finalize();
    return transaction;
}
