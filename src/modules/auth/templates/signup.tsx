"use client";

import { useFormState } from "react-dom";
import { authenticate } from "../services/actions";
import { usePathname } from "next/navigation";
import { Input } from "@/modules/common/components/input";
import Link from "next/link";
import { SubmitButton } from "../../common/components/submit-button";

export default function SignUp() {
  const [errorMessage, dispatch] = useFormState(authenticate, undefined);
  const pathname = usePathname();

  return (
    <div className="flex flex-col border justify-center items-center w-1/2 h-screen gap-5">
      <span className="font-bold items-left text-3xl m-6">Optitech</span>
      <section className="flex flex-col m-6">
        <h1 className="font-bold text-3xl">Registrarse</h1>
        <span className="text-lg">Regístrate para usar optitech</span>
        <div className="flex items-center">
          <form action={dispatch} className="flex flex-col gap-4 min-w-80 ">
          <Input
              label="Email"
              name="email"
              required
              type="email"
              labelPlacement="outside"
              placeholder="Escribe tu email"
              radius="sm"
              classNames={
                   {
                       inputWrapper: "h-[50px] ",
                       label: 'pb-1'
                    }
                }
                variant="bordered"
              />
            <label htmlFor="email">Contraseña</label>
            <Input
              label="Escribe tu contraseña"
              name="password"
              required
              type="password"
              radius="sm"
              variant="bordered"
            />
            <label htmlFor="email">Confirmar contraseña</label>
            <Input
              label="Vuelve a escribir tu contraseña"
              name="re-password"
              required
              type="password"
              radius="sm"
              variant="bordered"
            />
            {errorMessage && (
              <p className="text-red-600 font-bold text-xs">{errorMessage}</p>
            )}
            <SubmitButton className="rounded-lg gap-1"><Link href="/login" className="text-xs font-bold">
              Registrar</Link></SubmitButton>

            <div className="flex flex-row gap-1 mx-4">
              <span className="text-xs">¿Ya tienes cuenta? </span>
              <Link href="/login" className="text-xs font-bold">
                Inicia sesión
              </Link>
            </div>
            <div className="gap-1 mx-4">
              <span className="text-xs">Si te registras estás aceptando nuestros </span>
              <Link href="/service-terms" className="text-xs font-bold underline">
                Términos de servicio
              </Link>
              <span className="text-xs"> y </span>
              <Link href="/privacity-policy" className="text-xs font-bold underline">
                Política de privacidad
              </Link>
            </div>
          </form>
        </div>
      </section >
    </div>
  );
}
