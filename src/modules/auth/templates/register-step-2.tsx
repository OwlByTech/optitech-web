"use client";

import { ButtonCard } from "@/modules/common/components/button-card";
import { SubmitButton } from "@/modules/common/components/submit-button";
import Link from "next/link";
import { FiArrowLeftCircle } from "react-icons/fi";

export default function Step2() {
    return (
        <section className="flex flex-col border justify-center items-left w-full sm:w-1/2 h-screen gap-5 p-4 sm:p-10">
            <div className="flex items-left">
                <Link href="/signUp/stepOne">
                    <FiArrowLeftCircle className="h-7 w-7" />
                </Link>
                <span> Vuelve al paso uno </span>
            </div>
            <span className="font-bold text-3xl m-6">Paso 2: Escoge tu Rol</span>
            <div className="flex flex-col m-6">
                <span className="text-lg">Una vez lo escojas, no podrás cambiarlo.</span>
            </div>
            <div className="flex flex-col sm:flex-row justify-center items-center gap-4 sm:gap-8 m-6">
                <ButtonCard title="Asesor" icon={true} description="Si te encargas de revisar documentos" className={""} />
                <ButtonCard title="Institución / Independiente" icon={false} description="Si te encargas de subir documentos" className={""} />
            </div>
            <SubmitButton className="rounded-lg">
                <Link href="/signUp/stepThree" className="font-bold">
                    Registrar
                </Link>
            </SubmitButton>
        </section>
    );
}
