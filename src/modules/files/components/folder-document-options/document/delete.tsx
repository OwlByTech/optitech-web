import Modal from "@/modules/common/components/modal";
import { useDisclosure } from "@nextui-org/react";
import { useEffect } from "react";
import { OptionComponentProps } from "..";
import { File } from "@/modules/files/types";
import { useFormState } from "react-dom";
import { deleteDocumentForm } from "@/modules/files/services/actions";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export function DeleteDocumentOption(props: OptionComponentProps) {
  const router = useRouter();
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

    toast.success(response?.message);
    onClose();
    router.refresh();
    props.onClose();
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
      onClose={props.onClose}
      onAccept={onAccept}
      title={`Eliminar directorio ${value.name}`}
    ></Modal>
  );
}
