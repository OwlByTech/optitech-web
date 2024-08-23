import InstitutionDetails from '@/modules/institution/templates/details';

export const metadata = {
  title: `Institution`,
};

type Props = {
  params: {institution: number};
};

export default function Page({params}: Props) {
  // TODO: add institutions details and button to files.
  // TODO: Add get to get folder id
  return <InstitutionDetails folder={1} id={params.institution} />;
}
