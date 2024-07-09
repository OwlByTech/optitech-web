"use client"
import { useState } from "react";
import { Directory } from "../../types";
import { FolderViewTree } from "../folder-tree-view";

export function DirectoryTree({ directoryTree }: { directoryTree: Directory }) {
    const [directory, setDirectory] = useState(directoryTree)
    return (
        <div className="flex flex-col gap-2 bg-white w-[300px] rounded-lg p-2">
            <FolderViewTree directory={directory} setDirectory={setDirectory} directoryRoot={directory} />
        </div>
    )

}
