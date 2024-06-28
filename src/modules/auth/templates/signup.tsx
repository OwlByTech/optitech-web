"use client";

import { useFormState } from "react-dom";
import { authenticate } from "../services/actions";
import { usePathname, useRouter } from "next/navigation";
import { useAtom } from "jotai";
import { formDataAtom } from "../../../context/atom";
import { Input } from "@/modules/common/components/input";
import Link from "next/link";
import { SubmitButton } from "../../common/components/submit-button";
import { ChangeEvent, FormEvent, useState } from "react";

export default function SignUp() {
  const [errorMessage] = useFormState(authenticate, undefined);
  const [formData, setFormData] = useAtom(formDataAtom);
  const [confirmPassword, setConfirmPassword] = useState("");
  const router = useRouter();


  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleConfirmPasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setConfirmPassword(e.target.value);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (formData.password !== confirmPassword) {
      alert("Las contraseñas no coinciden");
      return;
    }
    router.push("/sign-up/step-one");
    console.log("Form Data:", JSON.stringify(formData));
  };

  return (
    <div className="flex flex-col border justify-center items-center w-1/2 h-screen gap-5">
      <span className="font-bold items-left text-3xl m-6">Optitech</span>
      <section className="flex flex-col m-6">
        <h1 className="font-bold text-3xl">Registrarse</h1>
        <span className="text-lg">Registrate para usar optitech</span>
        <div className="flex items-center">
          <form onSubmit={handleSubmit} className="flex flex-col gap-4 min-w-80">
            <label htmlFor="email">Email</label>
            <Input
              label="Escribe tu email"
              name="email"
              required
              type="email"
              radius="sm"
              variant="bordered"
              value={formData.email}
              onChange={handleChange}
            />
            <label htmlFor="password">Contraseña</label>
            <Input
              label="Escribe tu contraseña"
              name="password"
              required
              type="password"
              radius="sm"
              variant="bordered"
              value={formData.password}
              onChange={handleChange}
            />
            <label htmlFor="confirmPassword">Confirmar contraseña</label>
            <Input
              label="Vuelve a escribir tu contraseña"
              name="confirmPassword"
              required
              type="password"
              radius="sm"
              variant="bordered"
              value={confirmPassword}
              onChange={handleConfirmPasswordChange}
            />
            {errorMessage && (
              <p className="text-red-600 font-bold text-xs">{errorMessage}</p>
            )}
            <SubmitButton className="rounded-lg gap-1">
              <Link href="/sign-up/step-one" className="text-xs font-bold">
                <span className="text-xs font-bold">Registrar</span>
              </Link>
            </SubmitButton>

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
      </section>
    </div>
  );
}
