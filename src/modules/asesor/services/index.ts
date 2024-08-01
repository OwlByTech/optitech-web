import {apiSecureGet, apiSecurePost} from '@/modules/common/services';
import {Asesor, CreateAseorReq} from '../types';
import {CommonServiceRes} from '@/modules/common/types';

export async function createAsesorService(
  createAsesor: CreateAseorReq
): Promise<CommonServiceRes<Asesor | null>> {
  try {
    const data = await apiSecurePost<Asesor>('/asesor', createAsesor);
    if (!data) {
      return {errors: [['No se ha registrado los datos.']]};
    }
    return {
      data,
      messages: ['Bienvenido'],
    };
  } catch (e) {
    const error = e as Error;
    return {
      errors: [[error.message]],
    };
  }
}

export async function getAsesorService(id: number): Promise<CommonServiceRes<Asesor | null>> {
  try {
    const data = await apiSecureGet<Asesor>(`/asesor/${id}`);
    if (!data) {
      return {errors: [['No se encuentra asesor.']]};
    }
    return {
      data,
    };
  } catch (e) {
    const error = e as Error;
    return {
      errors: [[error.message]],
    };
  }
}
