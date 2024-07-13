import { Input } from "@/modules/common/components/input";
import Modal from "@/modules/common/components/modal";
import { Directory } from "../../types";
import { createDiretoryForm } from "../../services/actions";
import { useFormState } from "react-dom";
import { useEffect, useRef } from "react";
import { toast } from "sonner";

export type CreateDirectoryModalProps = {
  curDir: Directory;
  isOpen: boolean;
  onClose?: any;
  onOpenChange?: any;
};

export function CreateDirectoryModal(props: CreateDirectoryModalProps) {
  const nameRef = useRef<string>("");
  const [response, dispatch] = useFormState(createDiretoryForm, {
    message: null,
    errors: {},
  });

  useEffect(() => {
    if (response.errors) {
      return;
    }

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
  };

  return (
    <Modal
      isOpen={props.isOpen}
      onOpenChange={props.onOpenChange}
      title={`Crear carpeta en ${props.curDir.name}`}
      onAccept={onAccept}
    >
      <Input onChange={(e) => (nameRef.current = e.target.value)}></Input>
    </Modal>
  );
}
