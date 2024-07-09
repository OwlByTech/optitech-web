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
import { performServerHandshake } from "http2"

type Props = {
    directoryRoot: Directory
    directory: Directory,
    setDirectory: any
}

export function FolderViewTree({ directory, setDirectory, directoryRoot }: Props) {

    const { pending } = useFormStatus();
    const [open, setOpen] = useState(false)

    const directoryTreeAction = getDirectoryAction.bind(null, directory?.id)
    const [response, dispatch] = useFormState(directoryTreeAction, { directory: null, errors: {}, message: null });

    useEffect(() => {

        if (response.directory?.directory || response.directory?.document) {
            const data: Directory = {
                id: directory.id,
                name: directory.name,
                document: response.directory?.document,
                directory: response.directory.directory
            }
            const directory_node = { ...directoryRoot }
            handleDirectory(directory_node, data)

            setDirectory(directory_node)
        }

    }, [response])

    useEffect(() => {
        if (response.directory)
            setOpen(!open)
    }, [response])

    console.log("dispatch", response)

    function handleDirectory(directory_node: Directory, current_directory: Directory) {


        if (directory_node.directory) {
            for (const subDir of directory_node.directory) {
                handleDirectory(subDir, current_directory);
            }
        }
        if (directory_node.id === current_directory.id) {
            directory_node.document = current_directory.document
            directory_node.directory = current_directory.directory
        }
    }
    console.log(directory)
    return (
        <>

            <form action={open ? () => { setOpen(!open) } : dispatch}
                className="w-full"

            >
                <Button type="submit" isLoading={pending} className={`hover:bg-gray-50 flex flex-row w-full items-center justify-between h-8 rounded-lg bg-white text-black  text-xs gap-2 ${open ? "bg-gray-100 border-none " : "border"}  `}>
                    <LinkRef className="flex flex-row flex-grow gap-2" href={`${ROUTES_SIDEBAR.FILES}/${directory?.id}`}>
                        {directory.directory && open ?
                            <AiFillFolderOpen color="#FFC754" strokeWidth={1} className="h-4 w-4" />
                            :
                            <AiFillFolder color="#FFC754" strokeWidth={1} className="h-4 w-4" />
                        }
                        <span>{directory?.name}</span>
                    </LinkRef>


                    <>
                        {open ? <FiChevronDown strokeWidth={1} className="h-4 w-4" color="#000000" /> : <FiChevronRight className="h-4 w-4" strokeWidth={1} color="#000000" />}
                    </>

                </Button >

            </form >
            {!pending && open && directory?.directory && directory.directory.length > 0 &&
                <div className="flex flex-row pl-2 gap-1 w-full">
                    <span className="border-l-1 my-3 border-b-1    w-2" />
                    <div className="flex flex-col gap-2 w-full ">
                        {open && directory?.directory?.map((value) => <FolderViewTree setDirectory={setDirectory} directory={value} directoryRoot={directoryRoot} />)}
                    </div>
                </div>
            }
            {!pending && open && directory?.document && directory?.document.length > 0 &&
                <div className="flex flex-row pl-2 gap-1 w-full">
                    <span className="border-l-1 my-3 border-b-1    w-2" />
                    <div className="flex flex-col gap-2 w-full ">
                        {open && directory?.document?.map((value) => <FileViewTree document={value} />)}

                    </div>
                </div>
            }
            {pending &&
                <div className="flex flex-row pl-2 gap-1 w-full">
                    <span className="border-l-1 my-3 border-b-1    w-2" />
                    <div className="flex flex-col gap-2 w-full ">
                        Loading ...
                    </div>
                </div>
            }
        </>
    )

}
