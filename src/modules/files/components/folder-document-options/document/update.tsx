import Modal from '@/modules/common/components/modal';
import {useDisclosure} from '@nextui-org/react';
import {useEffect, useRef} from 'react';
import {OptionComponentProps} from '..';
import {useRouter} from 'next/navigation';
import {useFormState} from 'react-dom';
import {updateDocumentForm} from '@/modules/files/services/actions';
import {useFormResponse} from '@/modules/common/hooks/use-form-response';
import {UploadFile} from '@/modules/common/components/upload-file';

export function UpdateDocumentOption(props: OptionComponentProps) {
  const router = useRouter();
  const [response, dispatch] = useFormState(updateDocumentForm, {
    messages: [],
    errors: [],
  });
  const files = useRef<File[]>([]);
  const {isOpen, onOpen, onClose, onOpenChange} = useDisclosure();

  useEffect(() => {
    onOpen();
  }, []);

  useFormResponse({
    response,
    onEnd: () => {
      onClose();
      props.onClose && props.onClose();
      router.refresh();
    },
    onSuccess: () => {
      files.current = [];
    },
  });

  const onAccept = () => {
    const formData = new FormData();
    formData.set('id', props.value.id!.toString());
    formData.append('file', files.current[0]);
    dispatch(formData);
  };

  return (
    <Modal
      isOpen={isOpen}
      size="lg"
      onOpenChange={onOpenChange}
      title={`Actualizar documento ${props.value.name}`}
      onAccept={onAccept}
      onClose={props.onClose}
      classNames={{
        header: 'text-sm  ',
        backdrop: 'bg-white/80 backdrop-opacity-80',
      }}
    >
      <UploadFile
        name="file"
        className="min-h-8"
        required
        acceptedFileExtensions={['docx']}
        selectedFiles={files.current}
        onSelectedFile={file => (files.current = file)}
      />
    </Modal>
  );
}
