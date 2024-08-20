import Modal from '@/modules/common/components/modal';
import { useFormState } from 'react-dom';
import {
    forwardRef,
    useEffect,
    useImperativeHandle,
    useRef,
    useState,
} from 'react';
import { useRouter } from 'next/navigation';
import { UploadFile } from '@/modules/common/components/upload-file';
import { createDocumentForm } from '../../services/actions';
import { changeDirecotry } from '../../context';
import { useAtom } from 'jotai';
import { useDisclosure } from '@nextui-org/react';
import { useFormResponse } from '@/modules/common/hooks/use-form-response';
import { OptionComponentProps } from '../folder-document-options';

export type CreateDocumentModalRef = {
    openWithFiles: (files: FileList) => void;
    open: () => void;
    close: () => void;
};

export const CreateDocumentModal = forwardRef<CreateDocumentModalRef, OptionComponentProps>(
    (props, ref) => {
        const router = useRouter();
        const files = useRef<File[]>([]);
        const [_, setChange] = useAtom(changeDirecotry);
        const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure();
        const [_pending, setPending] = useState(false);

        const [response, dispatch] = useFormState(createDocumentForm, {
            messages: [],
            errors: [],
        });

        useEffect(() => {
            props.isOpen && onOpen();
        }, [props.isOpen]);

        useFormResponse({
            response,
            onSuccess: () => {
                setPending(false);
                onClose();
                setChange({ id: props.value.id, action: 'create' });
                router.refresh();
            },
        });

        useEffect(() => {
            files.current = [];
        }, [onOpenChange]);

        const onSubmit = () => {
            if (files.current.length < 0) return;

            const data = new FormData();
            data.set('directoryId', props.value.id!.toString());
            data.set('status', 'aprobado');

            files.current.forEach(file => data.append('files', file));
            files.current = [];

            dispatch(data);
        };

        useImperativeHandle(ref, () => ({
            openWithFiles: (fileList: FileList) => {
                const fileLists = [];
                for (const file of fileList) {
                    fileLists.push(file);
                }

                if (fileLists.length < 0) return;
                files.current = fileLists;
                onOpen();
            },
            open: () => onOpen(),
            close: () => onClose()
        }));

        return (
            <>
                {isOpen && (
                    <Modal
                        isOpen={isOpen}
                        onAccept={() => {
                            onClose();
                            onSubmit();
                        }}
                        onClose={props.onClose}
                        onOpenChange={onOpenChange}
                        title={`Subir archivo en ${props.value.name}`}
                        classNames={{
                            backdrop: 'bg-white/80 backdrop-opacity-80',
                        }}
                    >
                        <UploadFile
                            name="files"
                            multiple
                            required
                            acceptedFileExtensions={['docx', 'pdf']}
                            selectedFiles={files.current}
                            onSelectedFile={fileUploads => (files.current = fileUploads)}
                        />
                    </Modal>
                )}
            </>
        );
    }
);
