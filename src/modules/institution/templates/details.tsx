import {LinkRef} from '@/modules/common/components/link-ref';
import {ROUTES_SIDEBAR} from '@/modules/dashboard/types';

export type InstitutionDetailsProps = {
  id: number;
  folder: number;
};

export default function InstitutionDetails(props: InstitutionDetailsProps) {
  return (
    <div className='flex p-4'>
      {/* TODO: Create a button component that wraps the LinkRef component */}
      <LinkRef href={`${ROUTES_SIDEBAR.INSTITUTIONS}/${props.id}/files/${props.folder}`}
      className=' p-4 text-black border border-slate-900 rounded hover:bg-slate-900 hover:text-white'>
        Administrar Archivos
      </LinkRef>
    </div>
  );
}
