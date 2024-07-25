import Modal from "@/modules/common/components/modal";
import { Directory } from "../../types";
import { useFormState, useFormStatus } from "react-dom";
import {
  forwardRef,
  MutableRefObject,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { UploadFile } from "@/modules/common/components/upload-file";
import { createDocumentForm } from "../../services/actions";
import { changeDirecotry } from "../../context";
import { useAtom } from "jotai";
import { useDisclosure } from "@nextui-org/react";

export type CreateDocumentModalProps = {
  curDir: Directory;
};

export type CreateDocumentModalRef = {
  openWithFiles: (files: FileList) => void;
  open: () => void;
};

export const CreateDocumentModal = forwardRef<
  CreateDocumentModalRef,
  CreateDocumentModalProps
>((props, ref) => {
  const router = useRouter();

  const files = useRef<File[]>([]);
  const [response, dispatch] = useFormState(createDocumentForm, {
    message: [],
    errors: {},
  });

  const [_, setChange] = useAtom(changeDirecotry);

  const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure();
  const [pending, setPending] = useState(false);

  useEffect(() => {
    if (response.errors) {
      return;
    }
    setPending(false);
    response.message?.map((data) => {
      toast.info(data);
    });
    router.refresh();
    onClose();
    setChange({ id: props.curDir.id, action: "create" });
  }, [response]);

  useEffect(() => {
    files.current = [];
  }, [onOpenChange]);

  const onSubmit = () => {
    if (files.current.length < 0) return;

    const data = new FormData();
    data.set("directoryId", props.curDir.id!.toString());
    data.set("status", "aprobado");

    files.current.forEach((file) => data.append("files", file));
    files.current = [];

    dispatch(data);
  };

  useImperativeHandle(ref, () => ({
    openWithFiles: (fileList: FileList) => {
      const fileLists = [];
      for (const file of fileList) {
        fileLists.push(file);
      }

      if (fileLists.length < 0) return;
      files.current = fileLists;
      onOpen();
    },
    open: () => onOpen(),
  }));

  return (
    <>
      {isOpen && (
        <Modal
          isOpen={isOpen}
          onAccept={() => {
            onClose();
            onSubmit();
          }}
          onClose={onClose}
          onOpenChange={onOpenChange}
          title={`Subir archivo en ${props.curDir.name}`}
          classNames={{
            backdrop: "bg-white/80 backdrop-opacity-80",
          }}
        >
          <UploadFile
            name="files"
            multiple
            required
            acceptedFileExtensions={["doc", "pdf"]}
            selectedFiles={files.current}
            onSelectedFile={(fileUploads) => (files.current = fileUploads)}
          />
        </Modal>
      )}
    </>
  );
});
