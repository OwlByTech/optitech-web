import { atom } from "jotai";

export enum SignUpRoleType {
    ASSESOR = "assesor",
    INSTITUTION = "institution"
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
