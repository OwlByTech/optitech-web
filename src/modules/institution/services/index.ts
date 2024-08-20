import {Institution, InstitutionRes} from '../types';
import {apiSecureGet, apiSecureMethodPostFile, apiSecurePost} from '@/modules/common/services';
import {updateLogoInstitutionReq} from '../types/services';
import {CommonServiceRes} from '@/modules/common/types';
import { CreateAllFormatReq, CreateAllFormatRes } from '@/modules/asesor/types';

export async function getServicesInstitution() {
  return await apiSecureGet(`/services`);
}

export async function getInstitutionService(): Promise<InstitutionRes | null> {
  return await apiSecureGet<InstitutionRes>(`/institution`);
}
export async function createInstitutionService(
  institution: Institution
): Promise<Institution | null> {
  const data = await apiSecurePost<Institution | null>('/institution', institution);
  if (data?.id)
    await updateLogoInstitutionService({
      id: data?.id,
      logo: institution.logo as File,
    });
  return data;
}
export async function updateLogoInstitutionService(
  req: updateLogoInstitutionReq
): Promise<CommonServiceRes<boolean | null>> {
  try {
    const formData = new FormData();
    formData.append('logo', req.logo);
    const res = await apiSecureMethodPostFile(`/institution/logo/${req.id}`, formData);
    if (!res) {
      return {
        errors: [['No se ha actualizado foto de institucion']],
      };
    }

    return {
      messages: ['Se ha actualizado foto de institucion'],
    };
  } catch (error) {
    const e = error as Error;
    return {
      errors: [[e.message]],
    };
  }
}

export async function getLogoInstitutionService(id: number): Promise<string | null> {
  return await apiSecureGet<string | null>(`/institution/logo/${id}`);
}

export async function createAllFormatService(
  req: CreateAllFormatReq
): Promise<CommonServiceRes<CreateAllFormatRes | null>> {
  try {
      const data = await apiSecurePost<CreateAllFormatRes>('/institution/create-all-formats', req);
      if (!data) {
          return { errors: [['No se ha podido crear todos los formatos']] };
      }
      return {
          data,
          messages: ['Los formatos han sido creados.'],
      };
  } catch (e) {
      const error = e as Error;
      return {
          errors: [[error.message]],
      };
  }
}