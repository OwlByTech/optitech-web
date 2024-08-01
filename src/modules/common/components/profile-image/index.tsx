'use client';

import {Button} from '@/modules/common/components/button';
import {FiEdit, FiTrash2} from 'react-icons/fi';
import {useRef} from 'react';
import {useDisclosure} from '@nextui-org/react';
import Modal from '@/modules/common/components/modal';
import {UploadFile} from '@/modules/common/components/upload-file';

export type ProfileImageProps = {
  src?: string;
  handleSubmit: (file: File) => void;
};

export default function ProfileImage(props: ProfileImageProps) {
  const files = useRef<File[]>([]);
  const {isOpen, onOpen, onClose, onOpenChange} = useDisclosure();

  return (
    <div className="flex flex-col justify-center items-center md:items-start w-full md:w-[250px]  gap-y-2 pt-1: ">
      <div className="flex flex-col justify-center w-[250px] gap-y-2 pt-1: ">
        <div className="p-1 border">
          <img className="h-[250px] w-[250px]" src={props.src} />
        </div>
        <div className="flex flex-grow justify-between">
          <Button
            startContent={<FiEdit />}
            className="rounded-lg text-xs  p-1 bg-gray-100 text-black hover:bg-white hover:border hover:border-gray-300"
            onClick={onOpen}
            type="button"
          >
            Cambiar
          </Button>
          <Button
            startContent={<FiTrash2 />}
            className="rounded-lg text-xs  p-1 bg-gray-100 text-black hover:bg-white hover:border hover:border-gray-300"
          >
            Borrar
          </Button>
        </div>
      </div>
      {isOpen && (
        <Modal
          isOpen={isOpen}
          onAccept={() => {
            onClose();
            props.handleSubmit(files.current[0]);
          }}
          onClose={onClose}
          onOpenChange={onOpenChange}
          title={`Cambiar foto de perfil`}
          classNames={{
            backdrop: 'bg-white/80 backdrop-opacity-80',
          }}
        >
          <UploadFile
            name="files"
            required
            preview
            acceptedFileExtensions={['png', 'jpg']}
            selectedFiles={files.current}
            onSelectedFile={file => (files.current = file)}
          />
        </Modal>
      )}
    </div>
  );
}
