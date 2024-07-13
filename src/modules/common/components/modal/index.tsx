import React, { ReactNode } from "react";
import {
  Modal as ModalUI,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@nextui-org/react";
import { FiX } from "react-icons/fi";
import { Button } from "../button";

type ModalProps = {
  isOpen: boolean;
  onOpenChange?: any;
  title: string;
  children?: ReactNode;
  onAccept?: () => void;
};

export default function Modal(props: ModalProps) {
  return (
    <ModalUI
      placement="center"
      scrollBehavior="inside"
      size="3xl"
      isOpen={props.isOpen}
      closeButton={
        <div className="flex justify-center items-center h-10 w-10">
          <FiX className="h-6 w-6" color="#000000" />
        </div>
      }
      onOpenChange={props.onOpenChange}
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex mx-2 border-black flex-col gap-1">
              {props.title}
            </ModalHeader>
            <ModalBody>{props.children}</ModalBody>
            <ModalFooter>
              <Button className="font-bold rounded-lg" onClick={props.onAccept}>
                Aceptar
              </Button>
              <Button
                className="text-black rounded-lg font-bold bg-white border-1 border-black"
                onPress={onClose}
              >
                Cancelar
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </ModalUI>
  );
}
