'use client';

import {Button} from '@/modules/common/components/button';
import {Input} from '@/modules/common/components/input';
import {SubmitButton} from '@/modules/common/components/submit-button';
import {Textarea} from '@/modules/common/components/text-area';
import LogoInstitution from '../components/logo-institution';
import {InstitutionRes} from '../types';
import {useRouter} from 'next/navigation';
import {useFormState} from 'react-dom';
import {useFormResponse} from '@/modules/common/hooks/use-form-response';
import {updateInstitutionForm} from '../services/actions';

export type InformationInstitutionProps = {
  institution: InstitutionRes;
};

export default function InformationInstitution(props: InformationInstitutionProps) {
  const router = useRouter();
  const [response, dispatch] = useFormState(updateInstitutionForm, {
    messages: [],
    errors: [],
  });

  useFormResponse({
    response,
    onEnd: () => {
      router.refresh();
    },
  });

  const handleSubmit = (formData: FormData) => {
    formData.set('id', props.institution.id.toString());
    dispatch(formData);
  };

  return (
    <section className="flex flex-col m-4 p-4 bg-white shadow-md rounded-lg ">
      <form className="flex flex-col gap-4" action={handleSubmit}>
        <div className="flex flex-col gap-[10px]">
          <h1 className="text-xl pt-1">Informacion</h1>
          <hr className="w-full border-t" />
        </div>

        <div className="flex flex-col md:items-start md:flex-row md:flex-grow gap-x-[20px]">
          <LogoInstitution institution={props.institution} />
          <div className="flex  flex-col gap-y-[20px] pt-10 flex-grow">
            <Input
              name="institutionName"
              label="Nombre"
              placeholder="Nombre"
              defaultValue={props.institution.institutionName}
            />

            <Textarea
              name="description"
              placeholder="Escribe una descripción personal"
              defaultValue={props.institution.description}
            />
          </div>
        </div>
        <div className="flex flex-grow gap-5 justify-end">
          <Button
            type="reset"
            className="rounded-lg bg-gray-200 text-black hover:bg-black hover:text-white"
          >
            Restablecer
          </Button>
          <SubmitButton className="rounded-lg bg-black hover:bg-gray-200 hover:text-black">
            Actualizar
          </SubmitButton>
        </div>
      </form>
    </section>
  );
}
