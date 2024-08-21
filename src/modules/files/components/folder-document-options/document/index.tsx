import {FiDownload, FiEdit2, FiTrash, FiUpload} from 'react-icons/fi';
import {DeleteDocumentOption} from './delete';
import {DownloadDocumentOption} from './download';
import {RenameDocumentOption} from './rename';
import {Role} from '@/modules/dashboard/types';
import {ROLES} from '@/modules/auth/types/enum';
import { UpdateDocumentOption } from './update';

export const docOptions = (roles?: Role[]) => {
  const options = [
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

  if (!!roles?.find(r => r.roleName === ROLES.INSTITUTION)) {
    options.unshift({
      action: 'update',
      title: 'Actualizar',
      icon: <FiUpload />,
      component: UpdateDocumentOption,
    });
  }

  return options;
};
