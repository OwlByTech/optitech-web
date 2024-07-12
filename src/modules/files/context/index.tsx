import { atom } from "jotai";
import { Directory } from "../types";

export const directoryRoute = atom<Directory[]>([]);
