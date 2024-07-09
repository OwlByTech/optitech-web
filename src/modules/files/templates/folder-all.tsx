import { Directory } from "../types"
import { FolderView } from "../components/folder-view"

type Props = {
    directory: Directory,
}

export function FolderAll({ directory }: Props) {

    return (
        <div className="grid grid-cols-5 gap-4 p-4">
            <FolderView directory={{ id: directory.parentId, name: "..." }} />
            {directory.directory?.map((value) => (
                <FolderView directory={value} />
            ))}
        </div>

    )

}
