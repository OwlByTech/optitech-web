import { Institution } from "../types";
import { atomWithStorage } from "jotai/utils";

const data = localStorage.getItem("institution")
const institution: Institution = data && JSON.parse(data)

export const institutionStorage = atomWithStorage("institution", institution)

