import Modal from "@/modules/common/components/modal";
import { useDisclosure } from "@nextui-org/react";
import { useEffect } from "react";
import { OptionComponentProps } from "..";
import { Directory } from "@/modules/files/types";
import { toast } from "sonner";
import { useFormState } from "react-dom";
import { downloadDocumentForm } from "@/modules/files/services/actions";

export function DownloadDocumentOption(props: OptionComponentProps) {
  const [response, dispatch] = useFormState(downloadDocumentForm, {
    message: null,
    errors: {},
  });

  const value = props.value as Directory;

  useEffect(() => {
    const formData = new FormData();
    formData.set("id", value.id!.toString());
    dispatch(formData);
  }, []);

  useEffect(() => {
    if (response.errors) {
      return;
    }

    const link = document.createElement("a");
    link.href = response.message!;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    toast.success(`Documento ${props.value.name} descargado`);
    props.onClose();
  }, [response]);

  return <></>;
}
