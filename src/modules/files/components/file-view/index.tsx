import {Document, FolderLayout} from '../../types';
import {AiFillFile} from 'react-icons/ai';
import Select, {SelectKey} from '@/modules/common/components/select';
import {ReactNode} from 'react';
import {DOCUMENT_STATUS} from '../../types/enum';
import {useAtom} from 'jotai';
import {clientState} from '@/modules/auth/context/client';
import {ROLES} from '@/modules/auth/types/enum';
import {useFormState} from 'react-dom';
import {updateDocumentStatusForm} from '../../services/actions';
import {useRouter} from 'next/navigation';
import {useFormResponse} from '@/modules/common/hooks/use-form-response';

export type FileViewProps = {
  document: Document;
  layout: FolderLayout;
  options?: ReactNode;
};

export function FileView(props: FileViewProps) {
  const router = useRouter();
  const [response, dispatch] = useFormState(updateDocumentStatusForm, {
    messages: [],
    errors: [],
  });

  useFormResponse({
    response,
    onSuccess: data => {
      router.refresh();
    },
  });

  const onSubmit = (key: SelectKey) => {
    const formData = new FormData();
    formData.set('id', props.document.id.toString());
    formData.set('status', key.toString());
    dispatch(formData);
  };

  const [client, _setClient] = useAtom(clientState);
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

      {props.document.status !== DOCUMENT_STATUS.UPLOADED && (
        <Select
          isDisabled={!!client?.roles.find(r => r.roleName === ROLES.INSTITUTION)}
          defaultItem={props.document.status}
          disableKeys={[
            DOCUMENT_STATUS.GENERATED,
            DOCUMENT_STATUS.UPLOADED,
            DOCUMENT_STATUS.IN_REVIEW,
          ]}
          items={[
            {key: DOCUMENT_STATUS.GENERATED, label: 'Generado'},
            {key: DOCUMENT_STATUS.IN_REVIEW, label: 'En revisión'},
            {key: DOCUMENT_STATUS.UPLOADED, label: 'Subido'},
            {key: DOCUMENT_STATUS.REJECTED, label: 'Rechazado'},
            {key: DOCUMENT_STATUS.APPROVED, label: 'Aprobado'},
          ]}
          onSelect={onSubmit}
        />
      )}
    </div>
  );
}
