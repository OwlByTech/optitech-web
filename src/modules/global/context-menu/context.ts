import {atom} from 'jotai';
import {ContextMenuItems} from '.';

export const contextMenuStorage = atom<ContextMenuItems>([]);
