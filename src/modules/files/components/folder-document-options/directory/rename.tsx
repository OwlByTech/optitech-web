import Modal from "@/modules/common/components/modal";
import { useDisclosure } from "@nextui-org/react";
import { useEffect } from "react";
import { OptionComponentProps } from "..";
import { Input } from "@/modules/common/components/input";

export function RenameFolderOption(props: OptionComponentProps) {
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
      title={`Renombrar directorio ${props.value.name}`}
    >
      <Input defaultValue={props.value.name}></Input>
    </Modal>
  );
}
