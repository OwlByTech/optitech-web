"use client";

import { ButtonCard } from "@/modules/common/components/button-card";
import { SubmitButton } from "@/modules/common/components/submit-button";
import { useAtom } from "jotai";
import { FiGlobe, FiPackage } from "react-icons/fi";
import { signUpAtom, SignUpRoleType } from "../context/signup";
import { Button } from "@/modules/common/components/button";
import { BackButton } from "@/modules/common/components/back-button";
import { ImageSection } from "@/modules/common/layouts/image-section";

export default function Step2() {
    const [signUpData, setSignUpData] = useAtom(signUpAtom);

    return (
        <ImageSection src="https://talentspot-prod.s3.eu-west-1.amazonaws.com/template-4053/man%20at%20desk%20writing%20notes%20with%20headphones%20on-1694074539.jpeg?1694074539">
            <div className="flex flex-col gap-8">
                <BackButton href="/sign-up/step-one" title="Vuelve al paso uno" />
                <span className="font-bold text-3xl">Paso 2: Escoge tu Rol</span>
                <div className="flex flex-col">
                    <span className="text-lg">Una vez lo escojas, no podrás cambiarlo.</span>
                </div>
                <div className="flex flex-col md:flex-row gap-6">
                    <ButtonCard
                        active={signUpData.role === SignUpRoleType.ASSESOR}
                        onClick={() => setSignUpData({ ...signUpData, role: SignUpRoleType.ASSESOR })}
                        title="Asesor" icon={<FiGlobe size={24} />} description="Si te encargas de revisar documentos" />
                    <ButtonCard
                        active={signUpData.role === SignUpRoleType.INSTITUTION}
                        onClick={() => setSignUpData({ ...signUpData, role: SignUpRoleType.INSTITUTION })}
                        title="Institución / Independiente" icon={<FiPackage size={24} />} description="Si te encargas de subir documentos" />
                </div>
                <Button
                    onClick={() => {
                        console.log(signUpData);
                    }}
                    className="font-bold rounded-lg">
                    Registrar
                </Button>
            </div>
        </ImageSection>
    );
}
