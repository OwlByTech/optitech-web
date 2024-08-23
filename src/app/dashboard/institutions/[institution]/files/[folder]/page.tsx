import { ROUTES_SIDEBAR } from '@/modules/dashboard/types';
import {
  getDirectoryChildService,
  getDirectoryRouteService,
  getDirectoryService,
} from '@/modules/files/services';
import {FolderAll} from '@/modules/files/templates/folder-all';
import { redirect } from 'next/navigation';

type Props = {
  params: {folder: number; institution: number};
};

export default async function Page({params}: Props) {
  let directory = await getDirectoryService(params.folder, params.institution);
  if (!directory) {
    const parentFolder: any = await getDirectoryChildService(params.folder, params.institution);
    redirect(`${ROUTES_SIDEBAR.INSTITUTIONS}/${params.institution}/files/${parentFolder.id}`);
  }

  directory = await getDirectoryService(params.folder, params.institution);
  const directory_route = await getDirectoryRouteService(params.folder, params.institution);
  // TODO: Add logic if there isn't response, or is always get back?
  if (directory || directory_route) {
    return <FolderAll directory={directory!} routeDirectory={directory_route!} institution={params.institution}/>;
  }
  return;
}
