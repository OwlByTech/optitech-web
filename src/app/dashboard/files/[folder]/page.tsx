import { ROUTES_SIDEBAR } from "@/modules/dashboard/types";
import {
  getDirectoryRouteService,
  getDirectoryService,
} from "@/modules/files/services";
import { FolderAll } from "@/modules/files/templates/folder-all";
import { redirect } from "next/navigation";

type Props = {
  params: { folder: number };
};

export default async function Page({ params }: Props) {
  const directory = await getDirectoryService(params.folder);
  const directory_route = await getDirectoryRouteService(params.folder);
  // TODO: Add logic if there isn't response, or is always get back?
  if (directory || directory_route) {
    return (
      <FolderAll directory={directory!} routeDirectory={directory_route!} />
    );
  }
  return;
}
