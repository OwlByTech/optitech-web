import React, { ReactNode } from "react";
import { Modal as ModalUI, ModalContent, ModalHeader, ModalBody, ModalFooter } from "@nextui-org/react";
import { FiX } from "react-icons/fi";
import { Button } from "../button";

export default function Modal({ isOpen, onOpenChange, title, children }: { isOpen: boolean, onOpenChange: any, title: string, children: ReactNode }) {

    return (
        <>
            <ModalUI placement="center" scrollBehavior="inside" size="3xl" isOpen={isOpen} closeButton={<div className="h-10 w-10"><FiX className="h-7 w-7" color="#000000" /></div>} onOpenChange={onOpenChange}>
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">{title}</ModalHeader>
                            <ModalBody>
                                {children}
                            </ModalBody>
                            <ModalFooter>

                                <Button color="primary" onPress={onClose}>
                                    Aceptar
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </ModalUI>
        </>
    );
}

