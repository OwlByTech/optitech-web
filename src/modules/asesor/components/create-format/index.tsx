import Modal from '@/modules/common/components/modal';
import {useFormState} from 'react-dom';
import {forwardRef, useEffect, useImperativeHandle, useRef} from 'react';
import {useRouter} from 'next/navigation';
import {useAtom} from 'jotai';
import {useDisclosure} from '@nextui-org/react';
import {changeDirecotry} from '@/modules/files/context';
import {createFormatForm} from '../../services/actions';
import {useFormResponse} from '@/modules/common/hooks/use-form-response';
import {FormFormat} from '../form-format';
import { OptionComponentProps } from '@/modules/files/components/folder-document-options';

export type CreateFormatModalRef = {
  openWithFiles: (files: FileList) => void;
  open: () => void;
  close: () => void;
};

export const CreateFormatModal = forwardRef<CreateFormatModalRef, OptionComponentProps>(
  (props, ref) => {
    const router = useRouter();
    const [_, setChange] = useAtom(changeDirecotry);
    const file = useRef<File | null>(null);
    const service = useRef<number>(0);
    const {isOpen, onOpen, onClose, onOpenChange} = useDisclosure();
    const [response, dispatchReq] = useFormState(createFormatForm, {
      messages: [],
      errors: [],
    });

    useEffect(() => {
      props.isOpen && onOpen();
    }, [props.isOpen]);

    useFormResponse({
      response,
      onSuccess: () => {
        onClose();
        props.onClose && props.onClose();
        setChange({ id: props.value.id, action: 'create' });
        router.refresh();
      },
    });



    useImperativeHandle(ref, () => ({
      openWithFiles: (_fileList: FileList) => {},
      open: () => onOpen(),
      close: () => onClose()
    }));

    const onSubmit = (data: FormData) => {
      onClose();
      dispatchReq(data);
    };

    return (
      <>
        {isOpen && (
          <Modal
            isOpen={isOpen}
            isForm
            onAccept={(data: FormData) => {
              onClose();
              data.set('serviceId', service.current.toString());
              data.set('extension', '.doc');
              data.set('directoryId', props.value.id!.toString());
              onSubmit(data);
            }}
            onClose={props.onClose}
            onOpenChange={onOpenChange}
            title={`Subir formato en ${props.value.name}`}
            classNames={{
              backdrop: 'bg-white/80 backdrop-opacity-80',
            }}
          >
            <FormFormat file={file} service={service} serviceName={props.value.name!}/>
          </Modal>
        )}
      </>
    );
  }
);
