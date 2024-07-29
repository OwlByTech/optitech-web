import { atom } from "jotai";

export enum SignUpRoleType {
    // TODO: Find a way to create enum with number and use zod to received string and convert to int
    ASSESOR = '1',
    INSTITUTION = '2'
};

export type signUpReq = {
    givenName: string;
    surname: string;
    email: string;
    password: string;
    role: SignUpRoleType;
};

export const signUpAtom = atom<signUpReq>({
    givenName: "",
    surname: "",
    email: "",
    password: "",
    role: SignUpRoleType.ASSESOR
});


