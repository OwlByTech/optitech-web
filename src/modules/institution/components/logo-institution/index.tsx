'use client';

import {useFormState} from 'react-dom';
import {useEffect} from 'react';
import {toast} from 'sonner';
import {useRouter} from 'next/navigation';
import {InstitutionRes} from '../../types';
import ProfileImage from '@/modules/common/components/profile-image';
import {updateLogoInstitution} from '../../services/actions';
import {useFormResponse} from '@/modules/common/hooks/use-form-response';

export type LogoProps = {
  institution: InstitutionRes;
};

export default function LogoInstitution(props: LogoProps) {
  const router = useRouter();

  const [response, dispatch] = useFormState(updateLogoInstitution, {
    messages: [],
    errors: [],
  });

  useFormResponse({
    response,
    onEnd: () => {
      router.refresh();
    },
  });

  const handleSubmit = (file: File) => {
    const formData = new FormData();
    formData.set('id', props.institution.id.toString());
    formData.set('logo', file);
    dispatch(formData);
  };

  return <ProfileImage src={props.institution.logo} handleSubmit={handleSubmit} />;
}
