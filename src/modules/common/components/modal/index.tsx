import React, { ReactNode } from "react";
import { Modal as ModalUI, ModalContent, ModalHeader, ModalBody, ModalFooter } from "@nextui-org/react";
import { FiX } from "react-icons/fi";
import { Button } from "../button";

type Props = {
    isOpen: boolean
    onOpenChange: any
    title: string
    children: ReactNode
    onClick: () => void
}

export default function Modal({ isOpen, onOpenChange, title, children, onClick }: Props) {

    return (
        <>
            <ModalUI
                placement="center"
                scrollBehavior="inside"
                size="3xl" classNames={{ header: "pb-2", closeButton: 'pt-4' }}
                isOpen={isOpen}
                closeButton={<div className="h-10 w-10"><FiX className="h-6 w-6" color="#000000" /></div>} onOpenChange={onOpenChange}>
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex border-b-1 mx-2 border-black flex-col gap-1">{title}</ModalHeader>
                            <ModalBody>
                                {children}
                            </ModalBody>
                            <ModalFooter>
                                <Button className="font-bold" onClick={onClick}>
                                    Aceptar
                                </Button>
                                <Button className="text-black font-bold bg-white border-1 border-black" onPress={onClose}>
                                    Cancelar
                                </Button>

                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </ModalUI>
        </>
    );
}

