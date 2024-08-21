import {LinkRef} from '@/modules/common/components/link-ref';
import {Directory, FolderLayout} from '../../types';
import {AiFillFolder} from 'react-icons/ai';
import {ROUTES_SIDEBAR} from '@/modules/dashboard/types';
import {ReactNode} from 'react';

type Props = {
  directory: Directory;
  layout: FolderLayout;
  options?: ReactNode;
};

export function FolderView(props: Props) {
  const name = props.directory.name!;
  return (
    <div className='flex flex-row justify-between w-full'>
      <LinkRef
        href={`${ROUTES_SIDEBAR.FILES}/${props.directory?.id}`}
        className="flex flex-row  items-center font-normal text-xs overflow-hidden h-full p-2 gap-2 w-full"
      >
        <div>
          <AiFillFolder className="h-5 w-5 fill-sky-600" strokeWidth={1} />
        </div>
        <p className="truncate text-ellipsis">{name}</p>
      </LinkRef>

      {props.options}
    </div>
  );
}
