"use client";
import { FiArrowLeftCircle } from "react-icons/fi";
import Link from "next/link";
import { useFormState } from "react-dom";
import { SubmitButton } from "@/modules/common/components/submit-button";
import { changePasswordAction } from "../services/actions";
import { InputPassword } from "@/modules/common/components/input-password";
import { useRouter } from "next/navigation";
import { ROUTES_AUTH } from "../types/auth";
import { useFormResponse } from "@/modules/common/hooks/use-form-response";

export default function ChangePassword({ token }: { token: string }) {
  const change = changePasswordAction.bind(null, token);
  const router = useRouter();
  const [response, dispatch] = useFormState(change, {
    errors: [],
    messages: null,
  });

  useFormResponse({
    response,
    onSuccess: () => {
      router.replace(ROUTES_AUTH.LOGIN);
    },
  });

  return (
    <section className="flex flex-col justify-between  gap-20 md:gap-[114px] py-16 mx-5 md:mx-20 lg:mx-96">
      <div className="flex items-start justify-start w-full gap-x-5 ">
        <Link href={ROUTES_AUTH.LOGIN}>
          <FiArrowLeftCircle className="h-7 w-7" />
        </Link>
        <h1>Iniciar sesión</h1>
      </div>
      <div className="flex flex-col  gap-[50px] bg-none">
        <div>
          <h1 className="font-extrabold text-xl">Cambiar Contraseña.</h1>
          <p className="text-sm">Por favor, introduce tu contraseña.</p>
        </div>
        <form action={dispatch} className="flex flex-col gap-4 min-w-80 ">
          <div className="mx-5">
            <InputPassword
              label="Nueva contraseña"
              name="password"
              required
              radius="sm"
              variant="bordered"
            />
          </div>
          <div className="mx-5">
            <InputPassword
              label="Repetir contraseña"
              name="passwordReply"
              required
              radius="sm"
              variant="bordered"
            />
          </div>
          {response.errors && (
            <p className="text-red-600 font-bold text-xs">{response.message}</p>
          )}
          <SubmitButton className="rounded-lg">Aceptar</SubmitButton>
        </form>
      </div>
    </section>
  );
}
