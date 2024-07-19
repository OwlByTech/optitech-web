import Modal from "@/modules/common/components/modal";
import { useDisclosure } from "@nextui-org/react";
import { useEffect } from "react";
import { OptionComponentProps } from "..";
import { Directory } from "@/modules/files/types";
import { toast } from "sonner";
import { useFormState } from "react-dom";
import { deleteDiretoryForm } from "@/modules/files/services/actions";
import { useRouter } from "next/navigation";
import { useAtom } from "jotai";
import { changeDirecotry } from "@/modules/files/context";

export function DeleteFolderOption(props: OptionComponentProps) {
    const router = useRouter();
    const [change, setChange] = useAtom(changeDirecotry);
    const [response, dispatch] = useFormState(deleteDiretoryForm, {
        message: null,
        errors: {},
    });

    const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure();
    const value = props.value as Directory;

    useEffect(() => {
        onOpen();
    }, []);

    useEffect(() => {
        if (response.errors) {
            return;
        }

        toast.success(response?.message);
        onClose();
        setChange({ id: props.value.id, action: "delete-directory" })
        props.onClose();
        router.refresh();
    }, [response]);

    const onAccept = () => {
        const formData = new FormData();
        formData.set("id", value.id!.toString());
        dispatch(formData);
    };

    return (
        <Modal
            isOpen={isOpen}
            onOpenChange={onOpenChange}
            size="sm"
            placement="top-center"
            onClose={props.onClose}
            onAccept={onAccept}
            className="border-none"
            classNamesOwn={
                {

                    buttonOk: "bg-red-700 text-white text-xs",
                    buttonClose: " text-xs"
                }
            }
            classNames={{
                footer: "flex flex-row justify-center",
                body: "flex flex-row text-sm  justify-center items-center py-6 font-normal",
                backdrop: "bg-white/80 backdrop-opacity-80"
            }}
        >
            {` Eliminar directorio `}

            <span className="text-red-700 font-bold">{value.name} </span>{"?"}
        </Modal>
    );
}
