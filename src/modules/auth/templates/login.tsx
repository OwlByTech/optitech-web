"use client";
import { useFormState } from "react-dom";
import { authenticate } from "../services/actions";
import { Input } from "../../common/components/input";
import { InputPassword } from "../../common/components/input-password";
import { SubmitButton } from "../../common/components/submit-button";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
import { ROUTES_AUTH } from "../types/auth";
import Link from "next/link";

export default function Login() {
  const [errorMessage, dispatch] = useFormState(authenticate, undefined);
  const route = useRouter();
  const pathname = usePathname();
  useEffect(() => {
    if (pathname === "/") route.push(ROUTES_AUTH.LOGIN);
  }, [pathname]);
  return (
    <section className="flex items-center justify-center w-screen h-screen">
      <div className="flex flex-col p-5 gap-6 sm:border sm:border-black sm:rounded-2xl">
        <div className="flex flex-col mx-5 items-start w-full sm:mx-0 sm:items-center">
          <h1 className="font-bold text-xl">Iniciar sesión</h1>
          <p>Bienvenido otra vez</p>
        </div>
        <form action={dispatch} className="flex flex-col gap-4 min-w-80 ">
          <div className="mx-5">
            <Input
              label="Correo"
              name="email"
              required
              type="email"
              radius="sm"
              variant="bordered"
            />
          </div>
          <div className="mx-5">
            <InputPassword
              label="Contrasena"
              name="password"
              required
              radius="sm"
              variant="bordered"
            />
          </div>
          {errorMessage && (
            <p className="text-red-600 font-bold text-xs">{errorMessage}</p>
          )}

          <div className="flex flex-grows gap-1 mx-4">
            <p className="text-xs">¿Perdiste tu contraseña? </p>
            <Link href="/reset-password" className="text-xs font-bold">
              Recuperar Contraseña
            </Link>
          </div>

          <SubmitButton className="mx-5 rounded-lg">Aceptar</SubmitButton>
        </form>
      </div>
    </section>
  );
}
