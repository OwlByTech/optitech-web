"use client"
import { useEffect, useState } from "react";
import { Directory } from "../../types";
import { FolderViewTree } from "../folder-tree-view";
import { usePathname } from "next/navigation";
import { getDirectoryAction, getDirectoryChildAction } from "../../services/actions";
import { useFormState } from "react-dom";
import Loading from "@/modules/common/loading/loading";

export function DirectoryTree() {
    const [directory, setDirectory] = useState<Directory>()
    const [pending, setPeding] = useState(true)
    const pathname = usePathname()
    const id = Number(pathname.split("/")[3])
    const directoryTreeAction = getDirectoryChildAction.bind(null, id ? id : 1)
    const [response, dispatch] = useFormState(directoryTreeAction, { directory: null, errors: {}, message: null });
    useEffect(() => {
        dispatch()

    }, [])
    useEffect(() => {
        if (response.directory) {
            setDirectory(response.directory)
            setPeding(false)
        }
    }, [response])
    if (pending)
        return <Loading className="bg-white w-[300px] rounded-lg" />
    return (
        <div className=" bg-white shadow-md min-w-[340px] max-w-[340px] rounded-lg py-3 overflow-y-auto overflow-x-hidden">
            <div className=" flex flex-col  gap-2 w-full rounded-lg px-2 ">
                {directory && <FolderViewTree directory={directory} setDirectory={setDirectory} directoryRoot={directory} />}
            </div>
        </div>
    )

}
