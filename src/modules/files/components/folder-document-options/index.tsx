import {FiMoreVertical} from 'react-icons/fi';
import {Directory, File, FolderLayout} from '../../types';
import {FolderView} from '../folder-view';
import {FileView} from '../file-view';
import {Button} from '@/modules/common/components/button';
import {dirOptions} from './directory';
import {docOptions} from './document';
import {Dropdown, DropdownItem, DropdownMenu, DropdownTrigger} from '@nextui-org/react';

export type FolderDocumentOptionsProps = {
  type: 'document' | 'directory' | 'format';
  value: Directory | File;
  isOpenOptions: boolean;
  onOpenOptions?: () => void;
  onSelectOption?: (component: React.ComponentType<OptionComponentProps>) => void;
  onClosedOption?: () => void;
  layout: FolderLayout;
};

export type OptionComponentProps = {
  value: Directory | File;
  isOpen?: boolean;
  directory?: number;
  onClose?: () => void;
};

type FolderDocumentOptionProps = {
  onSelectOption: ((component: React.ComponentType<OptionComponentProps>) => void) | undefined;
  option: any;
  title: string;
};

function FolderDocumentOption(props: FolderDocumentOptionProps) {
  const onSelectOption = () => {
    props.onSelectOption && props.onSelectOption(props.option.component);
  };
  return (
    <Button
      onClick={onSelectOption}
      className="w-full flex h-7 flex-row gap-2 bg-transparent hover:bg-none  text-xs text-black"
    >
      {props.option.icon}
      {props.option.title}
    </Button>
  );
}

export function FolderDocumentOptions(props: FolderDocumentOptionsProps) {
  const options = (
    <Dropdown
      showArrow
      classNames={{
        content: ' p-0 border rounded-lg max-w-36 min-w-36 ',
      }}
    >
      <DropdownTrigger>
        <button className="hover:bg-none">
          <FiMoreVertical className="cursor-pointer fill-black h-5 w-5 hover:bg-gray-200 rounded-full p-1" />
        </button>
      </DropdownTrigger>
      <DropdownMenu
        itemClasses={{
          base: [
            'rounded-md',
            'p-0',
            'text-default-500',
            'transition-opacity',
            'data-[hover=true]:text-foreground',
            'data-[hover=true]:bg-default-100',
            'dark:data-[hover=true]:bg-default-50',
            'data-[selectable=true]:focus:bg-default-50',
            'data-[pressed=true]:opacity-70',
            'data-[focus-visible=true]:ring-default-500',
          ],
        }}
      >
        {props.type === 'directory'
          ? dirOptions.map(option => (
              <DropdownItem key={option.action}>
                <FolderDocumentOption
                  title={option.title}
                  option={option}
                  onSelectOption={props.onSelectOption}
                />
              </DropdownItem>
            ))
          : docOptions.map(option => (
              <DropdownItem key={option.action}>
                <FolderDocumentOption
                  title={option.title}
                  option={option}
                  onSelectOption={props.onSelectOption}
                />
              </DropdownItem>
            ))}
      </DropdownMenu>
    </Dropdown>
  );
  return (
    <div className="relative hover:bg-gray-50 flex flex-row justify-between rounded-lg bg-white text-black font-light text-sm border">
      {props.type === 'directory' ? (
        <FolderView layout={props.layout} directory={props.value as Directory} options={options}/>
      ) : (
        <FileView layout={props.layout} document={props.value as File} options={options} />
      )}
    </div>
  );
}
