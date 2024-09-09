import Modal from '@/modules/common/components/modal';
import {useDisclosure} from '@nextui-org/react';
import {useEffect} from 'react';
import {OptionComponentProps} from '..';
import {Directory} from '@/modules/files/types';
import {toast} from 'sonner';
import {useFormState} from 'react-dom';
import {deleteDiretoryForm} from '@/modules/files/services/actions';
import {useRouter} from 'next/navigation';
import {useAtom} from 'jotai';
import {changeDirecotry} from '@/modules/files/context';
import {useFormResponse} from '@/modules/common/hooks/use-form-response';

export function DeleteFolderOption(props: OptionComponentProps) {
  const router = useRouter();
  const [_, setChange] = useAtom(changeDirecotry);
  const [response, dispatch] = useFormState(deleteDiretoryForm, {
    messages: [],
    errors: [],
  });

  const {isOpen, onOpen, onClose, onOpenChange} = useDisclosure();
  const value = props.value as Directory;

  useEffect(() => {
    onOpen();
  }, []);

  useFormResponse({
    response,
    onSuccess: () => {
      setChange({id: props.value.id, action: 'delete-directory'});
      router.refresh();
    },
    onEnd: () => {
      onClose();
      props.onClose && props.onClose();
    },
  });

  const onAccept = () => {
    const formData = new FormData();
    formData.set('id', value.id!.toString());
    dispatch(formData);
  };

  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      size="sm"
      placement="top-center"
      onClose={props.onClose}
      onAccept={onAccept}
      className="border-none"
      classNamesOwn={{
        buttonOk: 'bg-red-700 text-white text-xs',
        buttonClose: ' text-xs',
      }}
      classNames={{
        footer: 'flex flex-row justify-center',
        body: 'flex flex-col text-sm  justify-center items-center py-6 font-normal',
        backdrop: 'bg-white/80 backdrop-opacity-80',
      }}
    >
      <span>{`Desea eliminar directorio`}</span>

      <span className="text-red-700 font-bold">{value.name} </span>
    </Modal>
  );
}
