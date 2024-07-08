"use client";

import { Input } from "@nextui-org/react";
import { useAtom } from "jotai";
import { signUpAtom } from "../context/signup";
import { useRouter } from "next/navigation";
import { SubmitButton } from "@/modules/common/components/submit-button";
import { ChangeEvent, FormEvent } from "react";
import { BackButton } from "@/modules/common/components/back-button";

export default function Step1() {
    const [formData, setFormData] = useAtom(signUpAtom);
    const router = useRouter();

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        router.push("/sign-up/step-two");
    };

    return (
        <section className="flex flex-col border justify-center w-full sm:w-1/2 h-screen gap-5 p-4 sm:p-0">
            <BackButton href="/sign-up" title="Registro" />

            <div className="flex flex-col gap-2">
                <span className="font-bold items-left text-3xl">Paso 1: Información Personal</span>
                <span className="text-md font-light">Tus datos están seguros con nosotros</span>
            </div>

            <form onSubmit={handleSubmit} className="flex w-full flex-col gap-4">
                <label htmlFor="givenName">Nombres</label>
                <Input
                    label="Escribe tu nombre"
                    name="givenName"
                    required
                    type="text"
                    radius="sm"
                    variant="bordered"
                    value={formData.givenName}
                    onChange={handleChange}
                />
                <label htmlFor="surname">Apellidos</label>
                <Input
                    label="Escribe tu apellido"
                    name="surname"
                    required
                    type="text"
                    radius="sm"
                    variant="bordered"
                    value={formData.surname}
                    onChange={handleChange}
                />
                <SubmitButton className="rounded-lg gap-1">
                    <span className="text-xs text-white font-bold">Siguiente</span>
                </SubmitButton>
            </form>
        </section>
    );
}
