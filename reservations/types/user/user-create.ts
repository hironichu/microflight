/** Request body to create user */
export type CreateUser = {
    _id?: string;
    /** user name */
    nom: string;
    /** user surname */
    prenom: string;
    /** user email */
    email: string;
    createdAt?: Date;
    updatedAt?: Date;
};