import Modal from "@/modules/common/components/modal";
import { Directory } from "../../types";
import { useFormState, useFormStatus } from "react-dom";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { UploadFile } from "@/modules/common/components/upload-file";
import { SubmitButton } from "@/modules/common/components/submit-button";
import { Button } from "@/modules/common/components/button";
import { createDocumentForm } from "../../services/actions";
import { changeDirecotry } from "../../context";
import { useAtom } from "jotai";
import { useDisclosure } from "@nextui-org/react";
import { FiUpload } from "react-icons/fi";

export type CreateDocumentModalProps = {
    curDir: Directory;
    files?: File[]
    setFiles?: any
};

export function CreateDocumentModal(props: CreateDocumentModalProps) {
    const router = useRouter();
    const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure();
    const [response, dispatch] = useFormState(createDocumentForm, {
        message: [],
        errors: {},
    });

    const [pending, setPending] = useState(false);
    const [_, setChange] = useAtom(changeDirecotry);
    const [selectedFiles, setSelectedFiles] = useState([]);

    useEffect(() => {
        if (props.files) {
            console.log(props.files, "akdlad")
            onSubmit(props.files)

        }
    }, [props.files])
    useEffect(() => {
        if (response.errors) {
            return;
        }
        setPending(false)
        response.message?.map((data => {
            toast.info(data);
        }))
        router.refresh();
        onClose();
        setChange({ id: props.curDir.id, action: "create" })
    }, [response]);


    useEffect(() => {
        setSelectedFiles([])
    }, [onOpenChange]);


    const onSubmit = (files?: any) => {
        const data = new FormData()
        data.set("directoryId", props.curDir.id!.toString());
        data.set("status", "aprobado")
        console.log(selectedFiles)
        if (files?.lenght > 0) {

            console.log(files)
            for (const file of files) {
                data.append("files", file)
            }
        } else {
            for (const file of selectedFiles) {
                data.append("files", file)
            }
        }
        props.setFiles && props.setFiles(null)
        dispatch(data)

    };

    return (
        <>
            {!props.files &&
                <>
                    <Button
                        onClick={() => {
                            onOpen();
                        }}
                        className="bg-white border text-xs text-black h-10 md:w-32"
                        isIconOnly
                        radius="md"
                        size="md"
                        startContent={<FiUpload className="md:h-5 md:w-5 w-6 h-6" />}
                    >
                        <span className="md:pl-2 hidden md:block">Subir archivo</span>
                    </Button>
                    {isOpen &&
                        <Modal
                            isOpen={isOpen}
                            onAccept={() => {
                                onClose()
                                onSubmit()
                            }}
                            onClose={onClose}
                            onOpenChange={onOpenChange}
                            title={`Subir archivo en ${props.curDir.name}`}
                            classNames={{
                                backdrop: "bg-white/80 backdrop-opacity-80"
                            }}
                        >
                            <UploadFile
                                name="files"
                                multiple
                                required
                                acceptedFileExtensions={["doc", "pdf"]}
                                selectedFiles={selectedFiles}
                                setSelectedFiles={setSelectedFiles}
                            />

                        </Modal>
                    }
                </>
            }
        </>
    );
}
