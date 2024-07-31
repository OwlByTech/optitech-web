import React, {ReactNode} from 'react';
import {
  Modal as ModalUI,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalProps as ModalPropsUI,
} from '@nextui-org/react';
import {FiX} from 'react-icons/fi';
import {Button} from '../button';
import {clx} from '@/utils/clx';

type ModalProps = {
  isOpen: boolean;
  onOpenChange?: any;
  title?: string;
  children?: ReactNode;
  onAccept?: () => void;
  onClose?: () => void;
  classNamesOwn?: {
    closeIcon?: string;
    buttonClose?: string;
    buttonOk?: string;
  };
} & ModalPropsUI;

export default function Modal(props: ModalProps) {
  return (
    <ModalUI
      placement="center"
      scrollBehavior="inside"
      size="3xl"
      onClose={props.onClose}
      closeButton={
        <div className="flex justify-center items-center h-10 w-10">
          <FiX className={clx('h-6 w-6', props.classNamesOwn?.closeIcon)} color="#000000" />
        </div>
      }
      onOpenChange={props.onOpenChange}
      {...props}
    >
      <ModalContent>
        {onClose => (
          <>
            <ModalHeader className="flex mx-2 border-black flex-col gap-1">
              {props?.title}
            </ModalHeader>
            <ModalBody>{props.children}</ModalBody>
            {props.onAccept && (
              <ModalFooter>
                <Button
                  className={clx('font-bold rounded-lg', props.classNamesOwn?.buttonOk)}
                  onClick={props.onAccept}
                >
                  Aceptar
                </Button>
                <Button
                  className={clx(
                    'text-black rounded-lg font-bold bg-white border-1 border-black',
                    props.classNamesOwn?.buttonClose
                  )}
                  onPress={onClose}
                >
                  Cancelar
                </Button>
              </ModalFooter>
            )}
          </>
        )}
      </ModalContent>
    </ModalUI>
  );
}
