"use client";

import { ButtonCard } from "@/modules/common/components/button-card";
import { useAtom } from "jotai";
import { FiGlobe, FiPackage } from "react-icons/fi";
import { Button } from "@/modules/common/components/button";
import { BackButton } from "@/modules/common/components/back-button";
import { ImageSection } from "@/modules/common/layouts/image-section";
import { registerFormAction } from "../services/actions";
import { useFormState } from "react-dom";
import { useRouter } from "next/navigation";
import { ROUTES_AUTH } from "../types/auth";
import { useFormResponse } from "@/modules/common/hooks/use-form-response";
import { signUpAtom } from "../context/signup";
import { REGISTER_ROLE } from "../types/enum";

export default function Step2() {
  const [signUpData, setSignUpData] = useAtom(signUpAtom);
  const router = useRouter();

  const [response, dispatch] = useFormState(registerFormAction, {
    errors: [],
    messages: [],
  });

  useFormResponse({
    response,
    onSuccess: () => {
      router.replace(ROUTES_AUTH.DASHBOARD);
    },
  });

  const handleSubmit = () => {
    const formData = new FormData();

    Object.entries(signUpData).forEach(([key, value]) => {
      formData.append(key, value as string);
    });

    dispatch(formData);
  };

  return (
    <ImageSection src="https://talentspot-prod.s3.eu-west-1.amazonaws.com/template-4053/man%20at%20desk%20writing%20notes%20with%20headphones%20on-1694074539.jpeg?1694074539">
      <div className="flex flex-col gap-8">
        <BackButton href="/sign-up/step-one" title="Vuelve al paso uno" />
        <span className="font-bold text-3xl">Paso 2: Escoge tu Rol</span>
        <div className="flex flex-col">
          <span className="text-lg">
            Una vez lo escojas, no podrás cambiarlo.
          </span>
        </div>
        <div className="flex flex-col md:flex-row gap-6">
          <ButtonCard
            active={signUpData.role === REGISTER_ROLE.ASSESOR}
            onClick={() =>
              setSignUpData({ ...signUpData, role: REGISTER_ROLE.ASSESOR })
            }
            title="Asesor"
            icon={<FiGlobe size={24} />}
            description="Si te encargas de revisar documentos"
          />
          <ButtonCard
            active={signUpData.role === REGISTER_ROLE.INSTITUTION}
            onClick={() =>
              setSignUpData({ ...signUpData, role: REGISTER_ROLE.INSTITUTION })
            }
            title="Institución / Independiente"
            icon={<FiPackage size={24} />}
            description="Si te encargas de subir documentos"
          />
        </div>
        <Button onClick={handleSubmit} className="font-bold rounded-lg">
          Registrar
        </Button>
      </div>
    </ImageSection>
  );
}
