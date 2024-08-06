import { ClientInfoRes } from "@/modules/dashboard/types";
import { atom } from "jotai";

export const clientState = atom<ClientInfoRes | null>(null);
