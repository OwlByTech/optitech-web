import Modal from '@/modules/common/components/modal';
import {useDisclosure} from '@nextui-org/react';
import {useEffect, useRef} from 'react';
import {OptionComponentProps} from '..';
import {Input} from '@/modules/common/components/input';
import {useRouter} from 'next/navigation';
import {useFormState} from 'react-dom';
import {updateDiretoryForm} from '@/modules/files/services/actions';
import {toast} from 'sonner';
import {useAtom} from 'jotai';
import {changeDirecotry} from '@/modules/files/context';
import {useFormResponse} from '@/modules/common/hooks/use-form-response';

export function RenameFolderOption(props: OptionComponentProps) {
  const router = useRouter();
  const [change, setChange] = useAtom(changeDirecotry);
  const [response, dispatch] = useFormState(updateDiretoryForm, {
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
    onSuccess: () => {
      setChange({id: props.value.id, action: 'rename'});
      onClose();
      props.onClose && props.onClose();
      nameRef.current = '';
      router.refresh();
    },
  });

  const onAccept = () => {
    const formData = new FormData();
    formData.set('directoryId', props.value.id!.toString());
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
