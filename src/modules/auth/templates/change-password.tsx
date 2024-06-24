"use client";
import { FiArrowLeftCircle } from "react-icons/fi";
import Link from "next/link";
import { useFormState } from "react-dom";
import { SubmitButton } from "@/modules/common/components/submit-button";
import { changePassword } from "../services/actions";
import { toast } from "react-toastify";
import { useEffect } from "react";
import { InputPassword } from "@/modules/common/components/input-password";
import { ROUTES_AUTH } from "../types";


export default function ChangePassword({ token }: { token: string }) {
    const change = changePassword.bind(null, token)
    const [response, dispatch] = useFormState(change, { errors: {}, message: null });

    useEffect(() => {
        if (!response?.errors)
            toast(response?.message)
    }, [response])

    return (
        <section className="flex flex-col justify-between gap-[114px] py-16 mx-5 sm:mx-96">
            <div className="flex items-start justify-start w-full gap-x-5 ">
                <Link href={ROUTES_AUTH.LOGIN}>
                    <FiArrowLeftCircle className="h-7 w-7" />
                </Link>
                <h1>Iniciar sesión</h1>
            </div>
            <div className="flex flex-col  gap-[50px] bg-none">
                <div>
                    <h1 className="font-extrabold text-xl">Cambiar Contraseña.</h1>
                    <p className="text-sm">
                        Por favor, introduce tu contrasena.
                    </p>
                </div>
                <form action={dispatch} className="flex flex-col gap-4 min-w-80 ">
                    <InputPassword
                        label="Nueva contrasena"
                        name="password"
                        required
                        radius="sm"
                        variant="bordered"
                    />
                    <InputPassword
                        label="Repetir contrasena"
                        name="passwordReply"
                        required
                        radius="sm"
                        variant="bordered"
                    />
                    {response.errors && (
                        <p className="text-red-600 font-bold text-xs">{response.message}</p>
                    )}
                    <SubmitButton className="rounded-lg">Aceptar</SubmitButton>
                </form>
            </div>
        </section>
    );
}
