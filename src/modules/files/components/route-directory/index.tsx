'use client';
import { LinkRef } from '@/modules/common/components/link-ref';
import { ROUTES_SIDEBAR } from '@/modules/dashboard/types';
import { useAtom } from 'jotai';
import { usePathname } from 'next/navigation';
import { FiChevronRight, FiFolderPlus, FiGrid, FiList, FiUpload } from 'react-icons/fi';
import { directoryRoute, folderLayout } from '../../context';
import { Button } from '@/modules/common/components/button';
import { Tooltip, useDisclosure } from '@nextui-org/react';
import { CreateDirectoryModal } from '../create-directory';
import { CreateDocumentModal, CreateDocumentModalRef } from '../create-document';
import { useRef, useState } from 'react';
import { clientState } from '@/modules/auth/context/client';
import { ROLES } from '@/modules/auth/types/enum';
import { CreateFormatModal } from '@/modules/asesor/components/create-format';

export function RouteDirectory() {
    const pathname = usePathname();

    const [layout, setLayout] = useAtom(folderLayout);
    const [directories, _] = useAtom(directoryRoute);
    const [createDir, setCreateDir] = useState(false);

    const uploadDocumentsRef = useRef<CreateDocumentModalRef>(null);
    const createFormatsRef = useRef<CreateDocumentModalRef>(null);

    const [client, __] = useAtom(clientState);
    const curParentDirectory = directories?.length > 0 && directories[directories?.length - 1];

    return (
        <div className="flex w-full max-w-full overflow-hidden flex-row p-2 justify-between">
            <div className="flex w-[300px] overflow-hidden">
                {directories &&
                    directories.map((value, index) => (
                        <Tooltip
                            placement="top"
                            showArrow
                            color="default"
                            delay={1000}
                            className="text-xs rounded-lg"
                            content={value.name}
                        >
                            <div
                                className={` max-w-28 flex flex-row items-center text-gray-500 font-light text-sm `}
                            >
                                <LinkRef
                                    href={`${ROUTES_SIDEBAR.FILES}/${value?.id}`}
                                    className={`truncate text-ellipsis hover:bg-gray-50 p-2 ${Number(pathname.split('/')[3]) === value.id && 'font-medium'
                                        } `}
                                >
                                    {value.name}
                                </LinkRef>

                                {index < directories.length - 1 && (
                                    <FiChevronRight color="#B5B5B5" strokeWidth={1} className="h-6 w-6 " />
                                )}
                            </div>
                        </Tooltip>
                    ))}
            </div>

            <div className="flex gap-2">
                <Tooltip
                    placement="bottom-start"
                    color="foreground"
                    className="text-xs rounded-lg"
                    content="Crear carpeta"
                >
                    <Button
                        onClick={() => {
                            setCreateDir(true);
                        }}
                        className="bg-white border text-xs text-black h-10 md:w-32"
                        isIconOnly
                        radius="md"
                        size="md"
                        startContent={<FiFolderPlus className="md:h-5 md:w-5 w-6 h-6" />}
                    >
                        <span className="md:pl-2 hidden md:block">Crear carpeta</span>
                    </Button>
                </Tooltip>

                <Tooltip
                    placement="bottom-start"
                    color="foreground"
                    className="text-xs rounded-lg"
                    content="Crear carpeta"
                >
                    <Button
                        onClick={() =>
                            client?.roles[0].roleName === ROLES.INSTITUTION ?
                                uploadDocumentsRef.current?.open()
                                : client?.roles[0].roleName === ROLES.ASSESOR &&
                                createFormatsRef.current?.open()
                        }
                        className="bg-white border text-xs text-black h-10 md:w-32"
                        isIconOnly
                        radius="md"
                        size="md"
                        startContent={<FiUpload className="md:h-5 md:w-5 w-6 h-6" />}
                    >
                        {client?.roles[0].roleName === ROLES.INSTITUTION ?

                            <span className="md:pl-2 hidden md:block">Subir archivo</span>
                            : client?.roles[0].roleName === ROLES.ASSESOR &&
                            <span className="md:pl-2 hidden md:block">Subir formato</span>
                        }
                    </Button>
                </Tooltip>

                {curParentDirectory && createDir && (
                    <CreateDirectoryModal value={curParentDirectory} onClose={() => setCreateDir(false)} />
                )}

                {curParentDirectory && (
                    <CreateDocumentModal ref={uploadDocumentsRef} curDir={curParentDirectory} />
                )}
                {curParentDirectory && (
                    <CreateFormatModal ref={createFormatsRef} curDir={curParentDirectory} />
                )}
                <div className="flex gap-2">
                    <Button
                        className={layout === 'list' ? 'text-white bg-black' : 'bg-white text-black'}
                        onClick={() => setLayout('list')}
                        isIconOnly
                        radius="md"
                        size="md"
                        startContent={<FiList className="md:h-5 md:w-5 w-6 h-6" />}
                    />
                    <Button
                        className={layout === 'grid' ? 'text-white bg-black' : 'bg-white text-black'}
                        onClick={() => setLayout('grid')}
                        isIconOnly
                        radius="md"
                        size="md"
                        startContent={<FiGrid className="md:h-5 md:w-5 w-6 h-6" />}
                    />
                </div>
            </div>
        </div >
    );
}
