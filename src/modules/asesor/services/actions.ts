'use server';
import {CommonActionState} from '@/modules/common/types/action';
import {createAsesorService, createFormatService} from '.';
import {CreateAllFormatReqValidator, CreateAsesorReqValidator, CreateFormatReq, CreateFormatReqValidator} from '../types';
import {BaseFormActionService} from '@/modules/common/services/action';
import {getClientInfoByTokenService} from '@/modules/dashboard/services';
import {getServicesInstitution} from '@/modules/institution/services';

export async function createAsesorForm(
  state: CommonActionState,
  payload: FormData
): Promise<CommonActionState> {
  const clientInfo = await getClientInfoByTokenService();
  if (clientInfo.errors || !clientInfo.data) return clientInfo;

  payload.set('clientId', clientInfo.data.id.toString());
  return await BaseFormActionService(state, payload, CreateAsesorReqValidator, createAsesorService);
}

export async function getServicesForm(
  state: CommonActionState,
  payload: FormData
): Promise<CommonActionState> {
  const services: any = await getServicesInstitution();

  return {
    data: services,
  };
}

export async function createFormatForm(
  state: CommonActionState,
  payload: FormData
): Promise<CommonActionState> {
  return await BaseFormActionService(state, payload, CreateFormatReqValidator, createFormatService);
}