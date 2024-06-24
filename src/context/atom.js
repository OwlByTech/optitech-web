import { atom } from "jotai";

export const formDataAtom = atom({
    giveName: "",
    surName: "",
    email: "",
    password: ""
});
