import { DeleteDocumentOption } from "./delete";
import { DownloadDocumentOption } from "./download";
import { RenameDocumentOption } from "./rename";

export const docOptions = [
  {
    action: "rename",
    title: "Renombrar",
    component: RenameDocumentOption,
  },
  {
    action: "delete",
    title: "Eliminar",
    component: DeleteDocumentOption,
  },
  {
    action: "download",
    title: "Descargar",
    component: DownloadDocumentOption,
  },
];
