import { getDirectoryService } from "@/modules/files/services"
import { FolderAll } from "@/modules/files/templates/folder-all"

type Props = {
    params: { folder: number }
}

export default async function Page({ params }: Props) {

    const directory = await getDirectoryService(params.folder)
    return <FolderAll directory={directory} />
}
