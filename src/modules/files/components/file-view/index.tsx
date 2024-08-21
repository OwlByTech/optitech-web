import SelectSearch from '@/modules/common/components/select-search';
import {File, FolderLayout} from '../../types';
import {AiFillFile} from 'react-icons/ai';
import Select from '@/modules/common/components/select';
import {ReactNode} from 'react';

export type FileViewProps = {
  document: File;
  layout: FolderLayout;
  options?: ReactNode;
};

export function FileView(props: FileViewProps) {
  const getFileIcon = () => {
    switch (true) {
      case props.document.name.includes('.pdf'):
        return <img src="/pdf.svg" className="h-5 w-5" />;
      case props.document.name.includes('.doc'):
        return <img src="/doc.svg" className="h-5 w-5" />;
      default:
        return <AiFillFile className="h-5 w-5" color="#FFC754" strokeWidth={1} />;
    }
  };
  return (
    <div className="flex flex-col gap-4 w-full p-2">
      <div className="flex flex-row justify-between">
        <div className="flex flex-row overflow-hidden h-full gap-2">
          {getFileIcon()}
          <p className=" truncate text-ellipsis">{props.document.name}</p>
        </div>
        {props.options}
      </div>

      <Select
        defaultItem="generated"
        items={[
          {key: 'generated', label: 'Generado'},
          {key: 'review', label: 'En revisión'},
          {key: 'rejected', label: 'Rechazado'},
          {key: 'approved', label: 'Aprobado'},
        ]}
        onSelect={() => {}}
      />
    </div>
  );
}
