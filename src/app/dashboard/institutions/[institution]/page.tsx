import { getDirectoryChildService } from '@/modules/files/services';
import InstitutionDetails from '@/modules/institution/templates/details';

export const metadata = {
  title: `Institution`,
};

type Props = {
  params: {institution: number};
};

export default async function Page({params}: Props) {
  // TODO: add institutions details and button to files.
  // TODO: Add get to get folder id
  const parentFolder: any = await getDirectoryChildService(1, params.institution);
  if(!parentFolder) return <></>;
  return <InstitutionDetails folder={parentFolder.id} id={params.institution} />;
}