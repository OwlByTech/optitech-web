import { useFormState } from 'react-dom';
import { useEffect, useState } from 'react';
import { UploadFile } from '@/modules/common/components/upload-file';
import { Input } from '@/modules/common/components/input';
import { Textarea } from '@/modules/common/components/text-area';
import { getServicesForm } from '../../services/actions';
import Loading from '@/modules/common/loading/loading';

export type FormFormatProps = {
  file: any;
  service: any;
  serviceName: string;
};

export const FormFormat = (props: FormFormatProps) => {
  const [loadServices, setLoadServices] = useState(true);
  const [services, dispatch] = useFormState(getServicesForm, {
    messages: [],
    errors: [],
  });

  useEffect(() => {
    dispatch(new FormData());
  }, []);

  useEffect(() => {
    if (services.data) {
      // @ts-ignore
      const service = services.data.find(s => s.name === props.serviceName);
      if (service) {
        props.service.current = service.id;
      }
      setLoadServices(false);
    }
  }, [services]);

  useEffect(() => {
    props.file.current = null;
  }, []);

  return (
    <>
      {loadServices ? (
        <Loading className="bg-white w-[300px] rounded-lg" />
      ) : (
        <>
          <Input name="name" label="Nombre" required placeholder="Nombre" />
          <Input name="version" label="Version" required placeholder="Version" />
          <Textarea label="Descripción" name="description" required placeholder="Descripción " />
          <UploadFile name="file" className="min-h-8" required acceptedFileExtensions={['docx']} />
        </>
      )}
    </>
  );
};
