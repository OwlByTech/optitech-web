import { DeleteDocumentOption } from "./delete";
import { DownloadDocumentOption } from "./download";

export const docOptions = [
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
