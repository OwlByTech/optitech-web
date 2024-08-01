"use client";
import { FiArrowLeftCircle } from "react-icons/fi";
import Link from "next/link";
import { useFormState } from "react-dom";
import { Input } from "@/modules/common/components/input";
import { SubmitButton } from "@/modules/common/components/submit-button";
import { resetPasswordAction } from "../services/actions";
import { ROUTES_AUTH } from "../types/auth";
import { useFormResponse } from "@/modules/common/hooks/use-form-response";

export default function ResetPassword() {
  const [response, dispatch] = useFormState(resetPasswordAction, {
    errors: [],
    messages: [],
  });

  useFormResponse({ response });

  return (
    <section className="flex flex-col justify-between  gap-20 md:gap-[114px] py-16 mx-5 md:mx-20 lg:mx-96">
      <div className="flex items-start justify-start w-full gap-x-5 ">
        <Link href={ROUTES_AUTH.LOGIN}>
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
          {response?.errors && response.message && (
            <p className="text-red-600 font-bold text-xs">
              {response?.message}
            </p>
          )}
          <SubmitButton className="rounded-lg font-bold">
            Restablecer contraseña
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
