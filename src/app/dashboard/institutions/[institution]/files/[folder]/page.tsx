import {getDirectoryRouteService, getDirectoryService} from '@/modules/files/services';
import {FolderAll} from '@/modules/files/templates/folder-all';

type Props = {
  params: {folder: number, institution: number};
};

export default async function Page({params}: Props) {
  console.log(params);
  const directory = await getDirectoryService(params.folder, params.institution);
  const directory_route = await getDirectoryRouteService(params.folder, params.institution);
  console.log(directory, directory_route);
  // TODO: Add logic if there isn't response, or is always get back?
  if (directory || directory_route) {
    return <FolderAll directory={directory!} routeDirectory={directory_route!} />;
  }
  return;
}
