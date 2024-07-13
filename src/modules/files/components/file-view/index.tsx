import { LinkRef } from "@/modules/common/components/link-ref"
import { Directory, File } from "../../types"
import { AiFillFile, AiFillFolderOpen } from "react-icons/ai"
import { ROUTES_SIDEBAR } from "@/modules/dashboard/types"

type Props = {
    document: File,
}

export function FileView({ document }: Props) {

    return (
        <LinkRef

            href={`${ROUTES_SIDEBAR.FILES}/document/${document?.id}`}
            className={`hover:bg-gray-50 flex flex-col items-center justify-between h-24 w-24 rounded-lg bg-white text-black font-light  p-2 text-sm gap-2 border  `}>

            <AiFillFile color="#FFC754" strokeWidth={1} className="h-16 w-16" />
            <span>
                {document?.name}
            </span>
        </LinkRef>
    )

}
