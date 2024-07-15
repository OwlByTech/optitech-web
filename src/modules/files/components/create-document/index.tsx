import { Input } from "@/modules/common/components/input";
import Modal from "@/modules/common/components/modal";
import { Directory } from "../../types";
import { createDiretoryForm, createDocumentForm } from "../../services/actions";
import { useFormState } from "react-dom";
import { useEffect, useRef } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { UploadFile } from "@/modules/common/components/upload-file";
import { SubmitButton } from "@/modules/common/components/submit-button";
import { Button } from "@/modules/common/components/button";

export type CreateDocumentModalProps = {
    curDir: Directory;
    isOpen: boolean;
    onClose?: any;
    onOpenChange?: any;
};

export function CreateDocumentModal(props: CreateDocumentModalProps) {
    const router = useRouter();
    const [response, dispatch] = useFormState(createDocumentForm, {
        message: null,
        errors: {},
    });

    useEffect(() => {
        if (response.errors) {
            return;
        }

        toast.success(response?.message);
    }, [response]);

    const onSubmit = (formData: FormData) => {
        formData.set("directoryId", props.curDir.id!.toString());
        formData.set("status", "aprobado")
        console.log(formData)
        dispatch(formData);
        props.onClose();
        router.refresh();
    };

    return (
        <Modal
            isOpen={props.isOpen}
            onOpenChange={props.onOpenChange}
            title={`Subir archivo en ${props.curDir.name}`}
        >
            <form className="flex flex-col gap-4" action={onSubmit}>
                <UploadFile
                    name="file"
                    required
                    acceptedFileExtensions={[]}
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
