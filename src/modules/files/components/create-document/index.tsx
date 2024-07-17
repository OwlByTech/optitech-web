import Modal from "@/modules/common/components/modal";
import { Directory } from "../../types";
import { useFormState } from "react-dom";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { UploadFile } from "@/modules/common/components/upload-file";
import { SubmitButton } from "@/modules/common/components/submit-button";
import { Button } from "@/modules/common/components/button";
import { createDocumentForm } from "../../services/actions";
import { changeDirecotry } from "../../context";
import { useAtom } from "jotai";

export type CreateDocumentModalProps = {
    curDir: Directory;
    isOpen: boolean;
    onClose?: any;
    onOpenChange?: any;
};

export function CreateDocumentModal(props: CreateDocumentModalProps) {
    const router = useRouter();
    const [response, dispatch] = useFormState(createDocumentForm, {
        message: [],
        errors: {},
    });

    const [change, setChange] = useAtom(changeDirecotry);
    const [selectedFiles, setSelectedFiles] = useState([]);
    useEffect(() => {
        if (response.errors) {
            return;
        }
        response.message?.map((data => {
            toast.info(data);
        }))
        setChange({ id: props.curDir.id, action: "create" })
    }, [response]);


    useEffect(() => {
        setSelectedFiles([])
    }, [props.onOpenChange]);


    const onSubmit = (formData: FormData) => {
        const data = new FormData()
        data.set("directoryId", props.curDir.id!.toString());
        data.set("status", "aprobado")
        for (const file of selectedFiles) {
            data.append("files", file)
        }

        console.log(data, formData)

        dispatch(data)
        router.refresh();
        props.onClose();
    };

    return (
        <Modal
            isOpen={props.isOpen}
            onOpenChange={props.onOpenChange}
            title={`Subir archivo en ${props.curDir.name}`}
        >
            <form className="flex flex-col gap-4" action={onSubmit}>
                <UploadFile
                    name="files"
                    multiple
                    required
                    acceptedFileExtensions={["doc", "pdf"]}
                    selectedFiles={selectedFiles}
                    setSelectedFiles={setSelectedFiles}
                />
                <div className=" flex flex-row gap-2  justify-end">
                    <SubmitButton>Aceptar</SubmitButton>
                    <Button
                        className="text-black rounded-lg font-bold bg-white border-1 border-black"
                        onPress={props.onClose}
                    >
                        Cancelar
                    </Button>
                </div>


            </form>

        </Modal>
    );
}
