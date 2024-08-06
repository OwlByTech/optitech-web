import Modal from '@/modules/common/components/modal';
import { useFormState, useFormStatus } from 'react-dom';
import {
    forwardRef,
    useEffect,
    useImperativeHandle,
    useRef,
    useState,
} from 'react';
import { useRouter } from 'next/navigation';
import { UploadFile } from '@/modules/common/components/upload-file';
import { useAtom } from 'jotai';
import { useDisclosure } from '@nextui-org/react';
import { changeDirecotry } from '@/modules/files/context';
import { Directory } from '@/modules/files/types';
import { createFormatForm } from '../../services/actions';
import { useFormResponse } from '@/modules/common/hooks/use-form-response';
import { FormFormatModal } from '../form-format';

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
        const [pending, setPending] = useState(false);
        const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure();
        const [response, dispatchReq] = useFormState(createFormatForm, {
            messages: [],
            errors: [],
        });

        useFormResponse({
            response,
            onSuccess: () => {
                setPending(false);
                onClose();
                setChange({ id: props.curDir.id, action: 'create' });
                router.refresh();
            },
        });
        useImperativeHandle(ref, () => ({
            openWithFiles: (fileList: FileList) => {
                onOpen();
            },
            open: () => onOpen(),
        }));



        const onSubmit = (data: FormData) => {
            onClose()
            dispatchReq(data);
        };

        return (
            <FormFormatModal
                title={`Subir formato en ${props.curDir.name}`}
                onSubmit={onSubmit}
                curDir={props.curDir}
                onOpen={onOpen}
                isOpen={isOpen}
                onOpenChange={onOpenChange}
                onClose={onClose}
            />

        )
    }
);
