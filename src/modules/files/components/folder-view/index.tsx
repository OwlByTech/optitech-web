import { LinkRef } from "@/modules/common/components/link-ref"
import { Directory } from "../../types"
import { AiFillFolder, AiFillFolderOpen } from "react-icons/ai"
import { ROUTES_SIDEBAR } from "@/modules/dashboard/types"

type Props = {
    directory: Directory,
}

export function FolderView({ directory }: Props) {

    return (
        <LinkRef

            href={`${ROUTES_SIDEBAR.FILES}/${directory?.id}`}
            className={`hover:bg-gray-50 flex flex-col items-center justify-between h-24 w-24 rounded-lg bg-white text-black font-light  p-2 text-sm gap-2 border  `}>

            <AiFillFolder color="#FFC754" strokeWidth={1} className="h-16 w-16" />
            <span>
                {directory?.name}
            </span>
        </LinkRef>
    )

}
