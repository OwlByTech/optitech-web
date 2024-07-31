'use client';

import {useAtom} from 'jotai';
import {signUpAtom} from '../context/signup';
import {useRouter} from 'next/navigation';
import {SubmitButton} from '@/modules/common/components/submit-button';
import {BackButton} from '@/modules/common/components/back-button';
import {ImageSection} from '@/modules/common/layouts/image-section';
import {Input} from '@/modules/common/components/input';

export default function Step1() {
  const [signUpData, setSignUpData] = useAtom(signUpAtom);
  const router = useRouter();

  const handleSubmit = (formData: FormData) => {
    const data = Object.fromEntries(formData.entries());
    setSignUpData({...signUpData, ...data});
    router.push('/sign-up/step-two');
  };

  return (
    <ImageSection src="https://talentspot-prod.s3.eu-west-1.amazonaws.com/template-4053/man%20at%20desk%20writing%20notes%20with%20headphones%20on-1694074539.jpeg?1694074539">
      <div className="flex flex-col gap-8">
        <BackButton href="/sign-up" title="Registro" />

        <div className="flex flex-col gap-2">
          <span className="font-bold items-left text-3xl">Paso 1: Información Personal</span>
          <span className="text-md font-light">Tus datos están seguros con nosotros</span>
        </div>

        <form action={handleSubmit} className="flex w-full flex-col gap-4">
          <Input
            defaultValue={signUpData.givenName}
            label="Escribe tu nombre"
            name="givenName"
            required
            radius="sm"
            variant="bordered"
          />

          <Input
            defaultValue={signUpData.surname}
            label="Escribe tu apellido"
            name="surname"
            required
            radius="sm"
            variant="bordered"
          />

          <SubmitButton className="rounded-lg gap-1">
            <span className="text-xs text-white font-bold">Siguiente</span>
          </SubmitButton>
        </form>
      </div>
    </ImageSection>
  );
}
