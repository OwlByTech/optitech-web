"use client"
import { LinkRef } from "@/modules/common/components/link-ref"
import { FiChevronDown, FiChevronRight, FiFile, FiFolder } from "react-icons/fi"
import { useEffect, useState } from "react"
import { Button } from "@/modules/common/components/button"
import { useFormState, useFormStatus } from "react-dom"
import { Directory } from "../../types"
import { getDirectoryAction } from "../../services/actions"
import { FileViewTree } from "../file-tree-view"
import { AiFillFolder, AiFillFolderOpen } from "react-icons/ai"
import { ROUTES_SIDEBAR } from "@/modules/dashboard/types"
import Spinner from "@/modules/common/icons/Spinner"
import { usePathname } from "next/navigation"
import { useAtom } from "jotai"
import { directoryRoute } from "../../context"

type Props = {
    directoryRoot: Directory
    directory: Directory,
    setDirectory: any
}



export function FolderViewTree({ directory, setDirectory, directoryRoot }: Props) {

    const [pending, setPeding] = useState(false);
    const pathname = usePathname()
    const directoryTreeAction = getDirectoryAction.bind(null, directory.id)
    const [response, dispatch] = useFormState(directoryTreeAction, { directory: null, errors: {}, message: null });
    const [directories,] = useAtom(directoryRoute)

    useEffect(() => {
        if (response.directory?.directory || response.directory?.document) {
            const data: Directory = {
                ...response.directory, open: true
            }
            const directory_node = { ...directoryRoot }
            handleDirectory(directory_node, data)
            setDirectory(directory_node)
        }
    }, [response])

    useEffect(() => {
        if (response.directory) {
            setPeding(false)
        }
    }, [response])

    useEffect(() => {
        directories.map((value) => {
            if (directory.id === value.id && !directory.directory) {
                setPeding(true)
                dispatch()
            }
            if (directory.id === value.id && directory.directory) {
                const directory_node = { ...directoryRoot }
                handleDirectoryOpenParent(directory_node, value.id)
                setDirectory(directory_node)
            }
        })
    }, [directories])

    function handleDirectory(directory_node: Directory, current_directory: Directory) {
        if (directory_node.id === current_directory.id) {
            directory_node.open = current_directory.open
            directory_node.document = current_directory.document
            directory_node.directory = current_directory.directory
            return
        }
        if (directory_node.directory) {
            for (const subDir of directory_node.directory) {
                handleDirectory(subDir, current_directory);
            }
        }
    }
    function handleDirectoryOpenParent(directory_node: Directory, id?: number) {
        if (directory_node.id === id) {
            directory_node.open = true
            return
        }
        if (directory_node.directory) {
            for (const subDir of directory_node.directory) {
                handleDirectoryOpenParent(subDir, id)
            }
        }
    }
    return (
        <>
            <Button
                className={`hover:bg-gray-50 flex flex-row w-full items-center justify-between h-8 rounded-lg bg-white text-black   text-xs gap-2 ${directory?.open ? "bg-gray-100 border-none " : "border"} ${Number(pathname.split("/")[3]) === directory.id && "bg-gray-300"}  `}>
                <LinkRef className="flex flex-row flex-grow gap-2" href={`${ROUTES_SIDEBAR.FILES}/${directory?.id}`}>
                    {directory.directory && directory.open ?
                        <AiFillFolderOpen color="#FFC754" strokeWidth={1} className="h-4 w-4" />
                        :
                        <AiFillFolder color="#FFC754" strokeWidth={1} className="h-4 w-4" />
                    }
                    <span>{directory?.name}</span>
                </LinkRef>
                <>
                    {pending ?
                        <Spinner />
                        : directory?.open ? <FiChevronDown onClick={() => {
                            const directory_node = { ...directoryRoot }
                            handleDirectory(directory_node, { ...directory, open: false })
                            setDirectory(directory_node)
                        }}
                            strokeWidth={1} className="h-4 w-4" color="#000000" /> :
                            <FiChevronRight className="h-4 w-4 cursor-pointer" onClick={() => {
                                if (!directory.directory) {
                                    setPeding(true)
                                    dispatch()
                                } else {
                                    const directory_node = { ...directoryRoot }
                                    handleDirectoryOpenParent(directory_node, directory.id)
                                    setDirectory(directory_node)
                                }
                            }} strokeWidth={1} color="#000000" />}
                </>
            </Button >
            {(!pending && directory?.open) && ((directory?.directory && directory.directory.length > 0) || (directory?.document && directory?.document.length > 0)) &&
                <div className="flex flex-row pl-2 gap-1 w-full">
                    <span className="border-l-1 my-3 border-b-1    w-2" />
                    <div className="flex flex-col gap-2 w-full ">
                        {directory?.directory?.map((value) => <FolderViewTree key={value.name} setDirectory={setDirectory} directory={value} directoryRoot={directoryRoot} />)}
                        {directory?.document?.map((value) => < FileViewTree key={value.name} document={value} />)}
                    </div>
                </div>
            }
        </>
    )
}
