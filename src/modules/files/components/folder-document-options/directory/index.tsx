import {FiEdit2, FiTrash} from 'react-icons/fi';
import {DeleteFolderOption} from './delete';
import {RenameFolderOption} from './rename';
import {Role} from '@/modules/dashboard/types';

export const dirOptions = (roles?: Role[]) => {
  const options = [
    {
      action: 'delete',
      title: 'Eliminar',
      icon: <FiTrash />,
      component: DeleteFolderOption,
    },
    {
      action: 'rename',
      title: 'Renombrar',
      icon: <FiEdit2 />,
      component: RenameFolderOption,
    },
  ];

  return options;
};
