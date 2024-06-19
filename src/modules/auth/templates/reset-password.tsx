"use client";
import { FiArrowLeftCircle } from "react-icons/fi";
import Link from "next/link";
import { useFormState } from "react-dom";
import { authenticate } from "../services/actions";
import { Input } from "@/modules/common/components/input";
import { SubmitButton } from "@/modules/common/components/submit-button";

export default function ResetPassword() {
  const [errorMessage, dispatch] = useFormState(authenticate, undefined);

  return (
    <section className="flex flex-col items-center justify-between gap-[114px] py-16 mx-5 sm:mx-96">
      <div className="flex items-start justify-start w-full gap-x-5 ">
        <Link href="/signloginUp">
          <FiArrowLeftCircle className="h-7 w-7" />
        </Link>
        <h1>Iniciar sesión</h1>
      </div>
      <div className="flex flex-col gap-[50px] bg-none">
        <div>
          <h1 className="font-extrabold text-xl">Restablecer Contraseña.</h1>
          <p className="text-sm">
            Por favor, introduce tu dirección de correo electrónico para
            solicitar un restablecimiento de contraseña.
          </p>
        </div>
        <form action={dispatch} className="flex flex-col gap-[50px] bg-none">
          <div>
            <Input
              label="Correo"
              name="email"
              required
              type="email"
              radius="sm"
              variant="bordered"
            />
          </div>
          {errorMessage && (
            <p className="text-red-600 font-bold text-xs">{errorMessage}</p>
          )}
          <SubmitButton className="rounded-lg font-bold">
            Enviar restablecimiento de contraseña
          </SubmitButton>
        </form>
        <div className="flex flex-row gap-1">
          <h1 className="text-sm">¿Recuerdas tu contraseña?</h1>
          <Link href="/login" className="text-sm font-bold">
            Inicia sesión.
          </Link>
        </div>
      </div>
    </section>
  );
}
