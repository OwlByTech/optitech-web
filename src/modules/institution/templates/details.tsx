import {LinkRef} from '@/modules/common/components/link-ref';
import {ROUTES_SIDEBAR} from '@/modules/dashboard/types';

export type InstitutionDetailsProps = {
  id: number;
  folder: number;
};

export default function InstitutionDetails(props: InstitutionDetailsProps) {
  return (
    <div>
      {/* TODO: Create a button component that wraps the LinkRef component */}
      <LinkRef href={`${ROUTES_SIDEBAR.INSTITUTIONS}/${props.id}/files/${props.folder}`}>
        Files
      </LinkRef>
    </div>
  );
}
