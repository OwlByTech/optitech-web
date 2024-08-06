import Modal from '@/modules/common/components/modal';
import { useFormState, useFormStatus } from 'react-dom';
import {
    useEffect,
    useRef,
    useState,
} from 'react';
import { UploadFile } from '@/modules/common/components/upload-file';
import { Directory } from '@/modules/files/types';
import { Input } from '@/modules/common/components/input';
import { Textarea } from '@/modules/common/components/text-area';
import { getServicesForm } from '../../services/actions';
import Loading from '@/modules/common/loading/loading';
import SelectSearch from '@/modules/common/components/select-search';
import { Format } from '../../types';

export type FormFormatModalProps = {
    curDir: Directory;
    onSubmit: (data: FormData) => void
    title: string
    isOpen: boolean
    onOpen: any
    onClose: any
    onOpenChange: any
    formData?: Format
};



export const FormFormatModal = (props: FormFormatModalProps) => {
    const files = useRef<File | null>();
    const service = useRef<number>(1);
    const [loadServices, setLoadServices] = useState(true)
    const [services, dispatch] = useFormState(getServicesForm, {
        messages: [],
        errors: [],
    });


    useEffect(() => {
        dispatch(new FormData())
    }, [props.onOpenChange])


    useEffect(() => {
        if (services.data) {
            setLoadServices(false)
        }
    }, [services])

    useEffect(() => {
        files.current = null;
    }, [props.onOpenChange]);




    return (
        <>
            {props.isOpen && (
                <Modal
                    isOpen={props.isOpen}
                    isForm
                    onAccept={(data: FormData) => {
                        data.set("serviceId", service.current.toString())
                        data.set("extension", ".doc")
                        data.set('directoryId', props.curDir.id!.toString());
                        props.onSubmit(data);
                    }}
                    onClose={props.onClose}
                    onOpenChange={props.onOpenChange}
                    title={props.title}
                    classNames={{
                        backdrop: 'bg-white/80 backdrop-opacity-80',
                    }}
                >
                    {loadServices ?
                        <Loading className="bg-white w-[300px] rounded-lg" />
                        :
                        <>
                            <Input
                                name="name"
                                label="Nombre"
                                required
                                placeholder="Nombre"
                            />
                            <Input
                                name="version"
                                label="Version"
                                required
                                placeholder="Version"
                            />

                            <Textarea
                                label="Descripción"
                                name="description"
                                required
                                placeholder="Descripción "
                            />
                            <SelectSearch
                                label='Servicio'
                                placeholder='Seleciona un servicio'
                                items={services.data}
                                onSelectionChange={(key) => {
                                    service.current = Number(key)
                                }}
                            />

                            <UploadFile
                                name="file"
                                className='min-h-8'
                                required
                                acceptedFileExtensions={['doc']}
                            />

                        </>
                    }
                </Modal>
            )}
        </>
    );
}
