import {FiDownload, FiEdit2, FiTrash, FiUpload} from 'react-icons/fi';
import {DeleteDocumentOption} from './delete';
import {DownloadDocumentOption} from './download';
import {RenameDocumentOption} from './rename';
import {Role} from '@/modules/dashboard/types';
import {ROLES} from '@/modules/auth/types/enum';
import {UpdateDocumentOption} from './update';
import {DOCUMENT_STATUS} from '@/modules/files/types/enum';

export const docOptions = (curStatus: DOCUMENT_STATUS, roles?: Role[], institution?: number) => {
  const options = [
    {
      action: 'download',
      icon: <FiDownload />,
      title: 'Descargar',
      component: DownloadDocumentOption,
    },
  ];

  if (!institution) {
    options.unshift(
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
      }
    );
  }

  if (
    !!roles?.find(r => r.roleName === ROLES.INSTITUTION) &&
    curStatus === DOCUMENT_STATUS.REJECTED
  ) {
    options.unshift({
      action: 'update',
      title: 'Actualizar',
      icon: <FiUpload />,
      component: UpdateDocumentOption,
    });
  }

  return options;
};
