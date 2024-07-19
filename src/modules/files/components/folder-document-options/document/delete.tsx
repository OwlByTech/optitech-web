import Modal from "@/modules/common/components/modal";
import { useDisclosure } from "@nextui-org/react";
import { useEffect } from "react";
import { OptionComponentProps } from "..";
import { File } from "@/modules/files/types";
import { useFormState } from "react-dom";
import { deleteDocumentForm } from "@/modules/files/services/actions";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useAtom } from "jotai";
import { changeDirecotry } from "@/modules/files/context";

export function DeleteDocumentOption(props: OptionComponentProps) {
    const router = useRouter();
    const [_, setChange] = useAtom(changeDirecotry);
    const [response, dispatch] = useFormState(deleteDocumentForm, {
        message: null,
        errors: {},
    });

    const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure();
    const value = props.value as File;

    useEffect(() => {
        onOpen();
    }, []);

    useEffect(() => {
        if (response.errors) {
            return;
        }

        setChange({ id: props.directory, action: "delete" })
        toast.success(response?.message);
        onClose();
        router.refresh();
        props.onClose()
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
                body: "flex flex-col text-sm  justify-center items-center py-6 font-normal",
                backdrop: "bg-white/80 backdrop-opacity-80"
            }}
        >
            <span>{`Desea eliminar documento`}</span>

            <span className="text-red-700 font-bold">{value.name} </span>
        </Modal>
    );
}
