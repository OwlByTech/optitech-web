import Modal from "@/modules/common/components/modal";
import { useDisclosure } from "@nextui-org/react";
import { useEffect } from "react";
import { OptionComponentProps } from "..";

export function DeleteFolderOption(props: OptionComponentProps) {
  const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure();

  useEffect(() => {
    onOpen();
  }, []);

  const onAccept = () => {
    onClose();
    props.onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      onClose={props.onClose}
      onAccept={onAccept}
      title={`Eliminar directorio ${props.value.name}`}
    ></Modal>
  );
}
