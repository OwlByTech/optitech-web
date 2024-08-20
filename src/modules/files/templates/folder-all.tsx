'use client';
import { Directory, File } from '../types';
import { useAtom } from 'jotai';
import { directoryRoute, folderLayout } from '../context';
import { FolderDocumentOptions, OptionComponentProps } from '../components/folder-document-options';
import { DragEvent, useCallback, useEffect, useRef, useState } from 'react';
import { contextMenuStorage } from '@/modules/global/context-menu/context';
import { CreateDirectoryModal } from '../components/create-directory';
import { DragAndDrop } from '@/modules/common/components/drag-and-drop';
import { toast } from 'sonner';
import { CreateDocumentModal, CreateDocumentModalRef } from '../components/create-document';
import { CreateFormatModal } from '@/modules/asesor/components/create-format';
import { clientState } from '@/modules/auth/context/client';
import { ROLES } from '@/modules/auth/types/enum';

export type DocumentDirectoryType = 'document' | 'directory' | "format";

type OptionStateType = {
    type?: DocumentDirectoryType;
    index?: number;
    component?: React.ComponentType<OptionComponentProps>;
    value?: Directory | File;
} | null;

type DocumentDiretoryType = 'document' | 'directory';
type IsOpenOptionsType = {
    type: DocumentDiretoryType;
    index: number;
};

export type FolderAllProps = {
    // TODO: Add types from the services.
    directory: Directory;
    routeDirectory: Directory[];
};

const CONTEXT_MENU_ATTRIBUTE = 'folder-all';

export function FolderAll(props: FolderAllProps) {
    const [layout, _setLayout] = useAtom(folderLayout);
    const [_contextMenuItems, setContextMenuItems] = useAtom(contextMenuStorage);
    const [isOpenOptions, setIsOpenOptions] = useState<IsOpenOptionsType | null>(null);
    const uploadDocumentsRef = useRef<CreateDocumentModalRef>(null);
    const [optionState, setOptionState] = useState<OptionStateType>();
    const [_, setDirectories] = useAtom(directoryRoute);
    const [client, __] = useAtom(clientState);

    useEffect(() => {
        const items = [
            {
                key: 'folder:new',
                title: 'Crear carpeta',
                handler: () => {
                    setOptionState({
                        component: CreateDirectoryModal,
                        value: props.directory,
                    });
                },
            },
        ];

        if (client?.roles[0].roleName === ROLES.ASSESOR) {
            items.unshift({
                key: 'update:format',
                title: 'Subir Formato',
                handler: () => {
                    setOptionState({
                        component: CreateFormatModal,
                        value: props.directory,
                    });
                },
            });
        }

        if (client?.roles[0].roleName === ROLES.INSTITUTION) {
            items.unshift({
                key: 'update:document',
                title: 'Subir archivo',
                handler: () => {
                    setOptionState({
                        component: CreateDocumentModal,
                        value: props.directory,
                    });
                },
            });
        }

        setContextMenuItems([
            {
                attribute: CONTEXT_MENU_ATTRIBUTE,
                items: items,
            },
        ]);
    }, [props.directory]);

    useEffect(() => {
        setDirectories(props.routeDirectory);
    }, [props.routeDirectory]);

    const onOpenOptions = (type: DocumentDiretoryType, index: number) => {
        if (type === isOpenOptions?.type && index === index) {
            setIsOpenOptions(null);
        } else {
            setIsOpenOptions({ type, index });
        }
    };

    const isOpenOptionsHandler = (type: DocumentDiretoryType, index: number) => {
        return isOpenOptions?.type === type && isOpenOptions.index === index;
    };

    const onSelectOption = (
        type: DocumentDiretoryType,
        index: number,
        component: React.ComponentType<OptionComponentProps>,
        value: Directory | File
    ) => {
        setOptionState({ type, index, component, value });
    };

    const onDropDocuments = useCallback((e: DragEvent<HTMLDivElement>) => {
        try {
            const files = e.dataTransfer.files;
            files.length > 0 && uploadDocumentsRef.current?.openWithFiles(files);
        } catch (e: any) {
            toast.error(e.toString());
        }
    }, []);

    return (
        <DragAndDrop
            className=" bg-sky-100 border border-dashed border-black rounded-md"
            onDrop={onDropDocuments}
        >
            <CreateDocumentModal curDir={props.directory} ref={uploadDocumentsRef} />
            <div data-contextmenu={CONTEXT_MENU_ATTRIBUTE} className="h-full p-4 overflow-auto">
                <div className={layout === 'grid' ? 'grid grid-cols-4 gap-4' : 'flex flex-col gap-4'}>
                    {optionState?.component && (
                        <optionState.component
                            isOpen={true}
                            value={optionState.value!}
                            directory={props.directory.id}
                            onClose={() => setOptionState(null)}
                        />
                    )}

                    {/* {props.directory.parentId !== 0 && (
          <FolderView
            directory={{ id: props.directory.parentId, name: "..." }}
          />
        )} */}

                    {props.directory?.directory?.map((value, index) => (
                        <FolderDocumentOptions
                            layout={layout}
                            key={index}
                            onOpenOptions={() => onOpenOptions('directory', index)}
                            isOpenOptions={isOpenOptionsHandler('directory', index)}
                            onSelectOption={component => onSelectOption('document', index, component, value)}
                            onClosedOption={() => setIsOpenOptions(null)}
                            type="directory"
                            value={value}
                        />
                    ))}
                    {props.directory?.document?.map((value, index) => (
                        <FolderDocumentOptions
                            layout={layout}
                            key={index}
                            onOpenOptions={() => onOpenOptions('document', index)}
                            isOpenOptions={isOpenOptionsHandler('document', index)}
                            onClosedOption={() => setIsOpenOptions(null)}
                            onSelectOption={component => onSelectOption('document', index, component, value)}
                            type="document"
                            value={value}
                        />
                    ))}
                </div>
            </div>
        </DragAndDrop>
    );
}
