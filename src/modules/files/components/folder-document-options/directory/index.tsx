import { DeleteFolderOption } from "./delete";
import { RenameFolderOption } from "./rename";

export const dirOptions = [
  {
    action: "delete",
    title: "Eliminar",
    component: DeleteFolderOption,
  },
  {
    action: "rename",
    title: "Renombrar",
    component: RenameFolderOption,
  },
];
