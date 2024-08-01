"use client";
import { useRouter } from "next/navigation";
import { Textarea } from "@/modules/common/components/text-area";
import { ContainerRegister } from "@/modules/common/components/container-register";
import { ImageSection } from "@/modules/common/layouts/image-section";
import { useFormState } from "react-dom";
import { createAsesorForm } from "../services/actions";
import { ROUTES_SIDEBAR } from "@/modules/dashboard/types";
import { useFormResponse } from "@/modules/common/hooks/use-form-response";

export default function RegisterAsesor() {
  const router = useRouter();
  const [response, dispatch] = useFormState(createAsesorForm, {
    errors: [],
    messages: [],
  });

  useFormResponse({
    response,
    onSuccess: () => {
      router.replace(ROUTES_SIDEBAR.DASHBOARD);
    },
  });

  return (
    <ImageSection src="https://www.clinicaazul.com.co/wp-content/uploads/2020/05/noticia2.jpg">
      <ContainerRegister
        title="Descripción"
        subtitle="Si quieres agrega una descripción personal"
        buttonName="Aceptar"
        action={dispatch}
      >
        <Textarea name="about" placeholder="Escribe una descripción personal" />
      </ContainerRegister>
    </ImageSection>
  );
}
