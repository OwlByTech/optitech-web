import { getDirectoryRouteService, getDirectoryService } from "@/modules/files/services"
import { FolderAll } from "@/modules/files/templates/folder-all"

type Props = {
    params: { folder: number }
}

export default async function Page({ params }: Props) {
    const directory = await getDirectoryService(params.folder)
    const directory_route = await getDirectoryRouteService(params.folder)
    return <FolderAll directory={directory} routeDirectory={directory_route} />
}
