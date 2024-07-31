'use client';

import {useAtom} from 'jotai';
import {signUpAtom} from '../context/signup';
import {Input} from '@/modules/common/components/input';
import Link from 'next/link';
import {SubmitButton} from '../../common/components/submit-button';
import {useState} from 'react';
import {ImageSection} from '@/modules/common/layouts/image-section';
import {InputPassword} from '@/modules/common/components/input-password';
import {useRouter} from 'next/navigation';

export default function SignUp() {
  const [errorMessage, setErrorMessage] = useState<string>();
  const [signUpData, setSignUpData] = useAtom(signUpAtom);
  const router = useRouter();

  const handleSubmit = (formData: FormData) => {
    const data = Object.fromEntries(formData.entries());

    if (data['password'] !== data['confirmPassword']) {
      setErrorMessage('Las contraseñas no coinciden');
      return;
    }

    delete data['confirmPassword'];

    setSignUpData({...signUpData, ...data});
    router.push('/sign-up/step-one');
  };

  return (
    <ImageSection src="https://talentspot-prod.s3.eu-west-1.amazonaws.com/template-4053/man%20at%20desk%20writing%20notes%20with%20headphones%20on-1694074539.jpeg?1694074539">
      <div className="flex flex-col gap-8">
        <div>
          <h1 className="font-bold text-3xl">Registrarse</h1>
          <span className="text-lg">Regístrate para usar optitech</span>
        </div>

        <form action={handleSubmit} className="flex flex-col gap-4 w-full">
          <Input
            defaultValue={signUpData.email}
            label="Escribe tu email"
            name="email"
            required
            type="email"
            radius="sm"
            variant="bordered"
          />

          <InputPassword
            defaultValue={signUpData.password}
            label="Escribe tu contraseña"
            name="password"
            required
            radius="sm"
            variant="bordered"
          />

          <InputPassword
            label="Vuelve a escribir tu contraseña"
            name="confirmPassword"
            required
            radius="sm"
            variant="bordered"
          />

          {errorMessage && <p className="text-red-600 font-bold text-xs">{errorMessage}</p>}

          <SubmitButton className="rounded-lg gap-1">
            <span className="text-xs font-bold">Registrar</span>
          </SubmitButton>

          <div className="flex flex-row gap-1 mx-4">
            <span className="text-xs">¿Ya tienes cuenta? </span>
            <Link href="/login" className="text-xs font-bold">
              Inicia sesión
            </Link>
          </div>
        </form>

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
      </div>
    </ImageSection>
  );
}
