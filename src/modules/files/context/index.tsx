import {atom} from 'jotai';
import {ChangeDirectory, Directory, FolderLayout} from '../types';

export const directoryRoute = atom<Directory[]>([]);
export const folderLayout = atom<FolderLayout>('grid');
export const changeDirecotry = atom<ChangeDirectory | null>(null);
