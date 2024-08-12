import Modal from '@/modules/common/components/modal';
import {useFormState, useFormStatus} from 'react-dom';
import {forwardRef, useImperativeHandle, useRef, useState} from 'react';
import {useRouter} from 'next/navigation';
import {useAtom} from 'jotai';
import {useDisclosure} from '@nextui-org/react';
import {changeDirecotry} from '@/modules/files/context';
import {Directory} from '@/modules/files/types';
import {createFormatForm} from '../../services/actions';
import {useFormResponse} from '@/modules/common/hooks/use-form-response';
import {FormFormat} from '../form-format';

export type CreateFormatModalProps = {
  curDir: Directory;
};

export type CreateFormatModalRef = {
  openWithFiles: (files: FileList) => void;
  open: () => void;
};

export const CreateFormatModal = forwardRef<CreateFormatModalRef, CreateFormatModalProps>(
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

    useFormResponse({
      response,
      onSuccess: () => {
        onClose();
        setChange({id: props.curDir.id, action: 'create'});
        router.refresh();
      },
    });
    useImperativeHandle(ref, () => ({
      openWithFiles: (fileList: FileList) => {},
      open: () => onOpen(),
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
              console.log(service);
              onClose();
              data.set('serviceId', service.current.toString());
              data.set('extension', '.doc');
              data.set('directoryId', props.curDir.id!.toString());
              onSubmit(data);
            }}
            onClose={onClose}
            onOpenChange={onOpenChange}
            title={`Subir formato en ${props.curDir.name}`}
            classNames={{
              backdrop: 'bg-white/80 backdrop-opacity-80',
            }}
          >
            <FormFormat file={file} service={service} />
          </Modal>
        )}
      </>
    );
  }
);
