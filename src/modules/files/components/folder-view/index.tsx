import {LinkRef} from '@/modules/common/components/link-ref';
import {Directory, FolderLayout} from '../../types';
import {AiFillFolder} from 'react-icons/ai';
import {ROUTES_SIDEBAR} from '@/modules/dashboard/types';

type Props = {
  directory: Directory;
  layout: FolderLayout;
};

export function FolderView(props: Props) {
  const name = props.directory.name!;
  return (
    <LinkRef
      href={`${ROUTES_SIDEBAR.FILES}/${props.directory?.id}`}
      className="flex flex-row  items-center font-normal text-xs overflow-hidden h-full py-2 pl-2 gap-2"
    >
      <div>
        <AiFillFolder className="h-5 w-5 fill-sky-600" strokeWidth={1} />
      </div>

      <p className="truncate text-ellipsis">{name}</p>
    </LinkRef>
  );
}
