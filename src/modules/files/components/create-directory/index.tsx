import { Input } from "@/modules/common/components/input";
import Modal from "@/modules/common/components/modal";
import { Directory } from "../../types";
import { createDiretoryForm } from "../../services/actions";
import { useFormState } from "react-dom";
import { useEffect, useRef } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useAtom } from "jotai";
import { changeDirecotry } from "../../context";

export type CreateDirectoryModalProps = {
    curDir: Directory;
    isOpen: boolean;
    onClose?: any;
    onOpenChange?: any;
};

export function CreateDirectoryModal(props: CreateDirectoryModalProps) {
    const router = useRouter();
    const nameRef = useRef<string>("");
    const [change, setChange] = useAtom(changeDirecotry);
    const [response, dispatch] = useFormState(createDiretoryForm, {
        message: null,
        errors: {},
    });

    useEffect(() => {
        if (response.errors) {
            return;
        }

        setChange({ id: props.curDir.id, action: "create" })
        toast.success(response?.message);
    }, [response]);

    const onAccept = () => {
        const formData = new FormData();
        formData.set("parentId", props.curDir.id!.toString());
        formData.set("name", nameRef.current);
        formData.set("institutionId", props.curDir.institutionId!.toString());
        dispatch(formData);
        nameRef.current = "";
        props.onClose();
        router.refresh();
    };

    return (
        <Modal
            isOpen={props.isOpen}
            size="lg"
            onOpenChange={props.onOpenChange}
            title={`Crear carpeta en ${props.curDir.name}`}
            onAccept={onAccept}
            classNames={{
                header: "text-sm  ",
                backdrop: "bg-white/80 backdrop-opacity-80"
            }}
        >
            <Input onChange={(e) => (nameRef.current = e.target.value)}></Input>
        </Modal>
    );
}
