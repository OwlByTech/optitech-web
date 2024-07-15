import { atom } from "jotai";
import { Directory, FolderLayout } from "../types";

export const directoryRoute = atom<Directory[]>([]);
export const folderLayout = atom<FolderLayout>("grid");
