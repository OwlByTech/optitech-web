'use client';
import {Button} from '@/modules/common/components/button';
import {useFormResponse} from '@/modules/common/hooks/use-form-response';
import {ClientInfoRes} from '@/modules/dashboard/types';
import {createAllFormatForm} from '@/modules/institution/services/actions';
import {useFormState} from 'react-dom';

export type InstitutionAsesorProps = {
  data: ClientInfoRes;
  id: number;
};

export default function InstitutionAsesor(props: InstitutionAsesorProps) {
  const [response, dispatch] = useFormState(createAllFormatForm, {
    errors: [],
    messages: [],
  });

  useFormResponse({
    response,
  });

  const onSubmit = () => {
    const formData = new FormData();
    formData.set('id', props.id.toString());
    dispatch(formData);
  };

  return (
    <div className='p-8'>
      <div className="flex flex-col justify-center items-center w-44 border-2 p-4">
        <img src={props.data.photo} />
        <span>{props.data.givenName}</span>
        <Button onClick={onSubmit}>Crear formatos</Button>
      </div>
    </div>
  );
}
