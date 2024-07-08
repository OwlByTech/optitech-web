import { FolderViewTree } from "../folder-tree-view";
import { directory } from "../types";

export function DirectoryTree() {

    return (
        <div className="flex flex-col gap-2 bg-white w-[300px] rounded-lg p-2">
            {directory.map(value => (<FolderViewTree folder={value} />))}
        </div>
    )

}
