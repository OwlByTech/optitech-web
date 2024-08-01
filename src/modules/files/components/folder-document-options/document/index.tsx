import {FiDownload, FiEdit2, FiTrash} from 'react-icons/fi';
import {DeleteDocumentOption} from './delete';
import {DownloadDocumentOption} from './download';
import {RenameDocumentOption} from './rename';

export const docOptions = [
  {
    action: 'rename',
    title: 'Renombrar',
    icon: <FiEdit2 />,
    component: RenameDocumentOption,
  },
  {
    action: 'delete',
    icon: <FiTrash />,
    title: 'Eliminar',
    component: DeleteDocumentOption,
  },
  {
    action: 'download',
    icon: <FiDownload />,
    title: 'Descargar',
    component: DownloadDocumentOption,
  },
];
