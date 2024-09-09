import Modal from '@/modules/common/components/modal';
import {useDisclosure} from '@nextui-org/react';
import {useEffect, useRef} from 'react';
import {OptionComponentProps} from '..';
import {Input} from '@/modules/common/components/input';
import {useRouter} from 'next/navigation';
import {useFormState} from 'react-dom';
import {renameDocumentForm} from '@/modules/files/services/actions';
import {useFormResponse} from '@/modules/common/hooks/use-form-response';

export function RenameDocumentOption(props: OptionComponentProps) {
  const router = useRouter();
  const [response, dispatch] = useFormState(renameDocumentForm, {
    messages: [],
    errors: [],
  });
  const nameRef = useRef<string>(props.value.name!);
  const {isOpen, onOpen, onClose, onOpenChange} = useDisclosure();

  useEffect(() => {
    onOpen();
  }, []);

  useFormResponse({
    response,
    onEnd: () => {
      onClose();
      props.onClose && props.onClose();
    },
    onSuccess: () => {
      nameRef.current = '';
      router.refresh();
    },
  });

  const onAccept = () => {
    const formData = new FormData();
    formData.set('id', props.value.id!.toString());
    formData.set('name', nameRef.current);
    dispatch(formData);
  };

  return (
    <Modal
      isOpen={isOpen}
      size="lg"
      onOpenChange={onOpenChange}
      title={`Renombrar directorio ${props.value.name}`}
      onAccept={onAccept}
      onClose={props.onClose}
      classNames={{
        header: 'text-sm  ',
        backdrop: 'bg-white/80 backdrop-opacity-80',
      }}
    >
      <Input
        defaultValue={props.value.name}
        onChange={e => (nameRef.current = e.target.value)}
      ></Input>
    </Modal>
  );
}
