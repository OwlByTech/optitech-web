'use server';

import {createInstitutionService, updateLogoInstitutionService} from '.';
import {CommonActionState} from '@/modules/common/types/action';
import {CreateInstitution, InstitutionLogo} from '../types';
import {BaseFormActionService} from '@/modules/common/services/action';
import {UpdateDirectoryReqValidator} from '@/modules/files/types';

export async function createInstitution(
  name?: string,
  description?: string,
  services?: number[],
  prevState: CommonActionState,
  formData: FormData
): Promise<CommonActionState> {
  const validateFields = CreateInstitution.safeParse({
    name: name,
    description: description,
    services: services,
  });
  if (validateFields.success) {
    const response = await createInstitutionService({
      ...validateFields.data,
      logo: formData.get('logo') as File,
    });
    if (response) {
      return {
        message: 'Institución creada exitosamente',
      };
    } else {
      return {
        errors: {
          api: 'Error conexion servidor',
        },
      };
    }
  }
  return {
    errors: validateFields.error.flatten().fieldErrors,
    message: 'Error',
  };
}

export async function updateLogoInstitution(
  state: CommonActionState,
  payload: FormData
): Promise<CommonActionState> {
  return await BaseFormActionService(state, payload, InstitutionLogo, updateLogoInstitutionService);
}
