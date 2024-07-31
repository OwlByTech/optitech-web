import Modal from "@/modules/common/components/modal";
import { useDisclosure } from "@nextui-org/react";
import { useEffect } from "react";
import { OptionComponentProps } from "..";
import { Directory } from "@/modules/files/types";
import { toast } from "sonner";
import { useFormState } from "react-dom";
import { downloadDocumentForm } from "@/modules/files/services/actions";
import { useFormResponse } from "@/modules/common/hooks/use-form-response";

export function DownloadDocumentOption(props: OptionComponentProps) {
  const [response, dispatch] = useFormState(downloadDocumentForm, {
    messages: [],
    errors: [],
  });

  const value = props.value as Directory;

  useEffect(() => {
    const formData = new FormData();
    formData.set("id", value.id!.toString());
    dispatch(formData);
  }, []);

  useFormResponse({response, onSuccess: (data) => {
    const link = document.createElement("a");
    link.href = data;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    props.onClose && props.onClose();
  }})

  return <></>;
}
