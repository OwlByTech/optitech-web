import {FiEdit, FiEdit2, FiTrash} from 'react-icons/fi';
import {DeleteFolderOption} from './delete';
import {RenameFolderOption} from './rename';

export const dirOptions = [
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
