"use client"
import { Directory } from "../types"
import { FolderView } from "../components/folder-view"
import { FileView } from "../components/file-view"
import { RouteDirectory } from "../components/route-directory"
import { useAtom } from "jotai"
import { directoryRoute } from "../context"
import { useEffect } from "react"

type Props = {
    directory: Directory,
    routeDirectory: Directory[]
}

export function FolderAll({ directory, routeDirectory }: Props) {
    const [directories, setDirectories] = useAtom(directoryRoute)
    useEffect(() => {
        setDirectories(routeDirectory)
    }, [routeDirectory])

    return (
        <div className="flex flex-col p-4">
            <div className="grid grid-cols-5 gap-4 p-4">
                {(directory.parentId !== 0) &&
                    <FolderView directory={{ id: directory.parentId, name: "..." }} />
                }
                {directory.directory?.map((value) => (
                    <FolderView directory={value} />
                ))}
                {directory.document?.map((value) => (
                    <FileView document={value} />
                ))}
            </div>
        </div>
    )
}
