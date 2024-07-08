"use client";

import { ButtonCard } from "@/modules/common/components/button-card";
import { SubmitButton } from "@/modules/common/components/submit-button";
import { useAtom } from "jotai";
import Link from "next/link";
import { FiArrowLeftCircle, FiGlobe, FiPackage } from "react-icons/fi";
import { signUpAtom, SignUpRoleType } from "../context/signup";
import { Button } from "@/modules/common/components/button";
import { BackButton } from "@/modules/common/components/back-button";

export default function Step2() {
    const [signUpData, setSignUpData] = useAtom(signUpAtom);

    return (
        <section className="flex flex-col border justify-center items-left w-full sm:w-1/2 h-screen gap-5 p-4 sm:p-10">
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
            <SubmitButton className="rounded-lg">
                <Button
                    onClick={() => {
                        console.log(signUpData);
                    }}
                    className="font-bold">
                    Registrar
                </Button>
            </SubmitButton>
        </section>
    );
}
