"use client";

import { Input, Link } from "@nextui-org/react";
import { usePathname } from "next/navigation";
import { useFormState } from "react-dom";
import { authenticate } from "../services/actions";
import { SubmitButton } from "@/modules/common/components/submit-button";

export default function Step1() {
    const [errorMessage, dispatch] = useFormState(authenticate, undefined);
    const pathname = usePathname();

    return (
        <section className="flex flex-col border justify-center items-center w-full sm:w-1/2 h-screen gap-5 p-4 sm:p-0">
            <span className="font-bold items-left text-3xl m-6">Paso 1: Información Personal</span>
            <div className="flex flex-col m-6 w-full sm:w-auto">
                <span className="text-lg">Tus datos están seguros con nosotros</span>
                <div className="flex items-center">
                    <form action={dispatch} className="flex flex-col gap-4 w-full sm:min-w-80">
                        <label htmlFor="giveName">Nombres</label>
                        <Input
                            label="Escribe tu nombre"
                            name="giveName"
                            required
                            type="text"
                            radius="sm"
                            variant="bordered"
                        />
                        <label htmlFor="surName">Apellidos</label>
                        <Input
                            label="Escribe tu apellido"
                            name="surName"
                            required
                            type="text"
                            radius="sm"
                            variant="bordered"
                        />
                        {errorMessage && (
                            <p className="text-red-600 font-bold text-xs">{errorMessage}</p>
                        )}
                        <SubmitButton className="rounded-lg gap-1">
                            <Link href="/sign-up/step-two" className="text-xs text-white font-bold">
                                Siguiente
                            </Link>
                        </SubmitButton>
                    </form>
                </div>
            </div>
        </section>
    );
}
