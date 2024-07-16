import Modal from "@/modules/common/components/modal";
import { useDisclosure } from "@nextui-org/react";
import { useEffect, useRef } from "react";
import { OptionComponentProps } from "..";
import { Input } from "@/modules/common/components/input";
import { useRouter } from "next/navigation";
import { useFormState } from "react-dom";
import { renameDocumentForm, updateDiretoryForm } from "@/modules/files/services/actions";
import { toast } from "sonner";

export function RenameDocumentOption(props: OptionComponentProps) {
  const router = useRouter();
  const [response, dispatch] = useFormState(renameDocumentForm, {
    message: null,
    errors: {},
  });
  const nameRef = useRef<string>(props.value.name!);
  const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure();

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
    nameRef.current = "";
  }, [response]);

  const onAccept = () => {
    const formData = new FormData();
    formData.set("id", props.value.id!.toString());
    formData.set("name", nameRef.current);
    dispatch(formData);
  };

  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      onClose={props.onClose}
      onAccept={onAccept}
      title={`Renombrar directorio ${props.value.name}`}
    >
      <Input
        defaultValue={props.value.name}
        onChange={(e) => (nameRef.current = e.target.value)}
      ></Input>
    </Modal>
  );
}
