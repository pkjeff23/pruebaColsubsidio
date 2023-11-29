import { Phones } from "./phones";

export interface Users {
    idClient: number,
    phones:Array<Phones>,
    email: string,
    password: string,
    created: Date,
    modified: Date,
    lastLogin: Date,
    token: string,
    name: string,
    active: boolean;
}
