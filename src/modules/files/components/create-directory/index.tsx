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
import { useDisclosure } from "@nextui-org/react";
import { OptionComponentProps } from "../folder-document-options";

export function CreateDirectoryModal(props: OptionComponentProps) {
    const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure();
    const router = useRouter();
    const nameRef = useRef<string>("");
    const [_, setChange] = useAtom(changeDirecotry);
    const [response, dispatch] = useFormState(createDiretoryForm, {
        message: null,
        errors: {},
    });

    useEffect(() => {
        onOpen();
    }, []);

    useEffect(() => {
        if (response.errors) {
            return;
        }
        onClose();
        props.onClose && props.onClose()
        setChange({ id: props.value.id, action: "create" });
        toast.success(response?.message);
        router.refresh()
    }, [response]);

    const onAccept = () => {
        const formData = new FormData();
        formData.set("parentId", props.value.id!.toString());
        formData.set("name", nameRef.current);
        formData.set("institutionId", props.value.institutionId!.toString());
        dispatch(formData);
        nameRef.current = "";
    };

    return (
        <Modal
            isOpen={isOpen}
            size="lg"
            onOpenChange={onOpenChange}
            title={`Crear carpeta en ${props.value.name}`}
            onAccept={onAccept}
            onClose={props.onClose}
            classNames={{
                header: "text-sm  ",
                backdrop: "bg-white/80 backdrop-opacity-80",
            }}
        >
            <Input onChange={(e) => (nameRef.current = e.target.value)}></Input>
        </Modal>
    );
}
