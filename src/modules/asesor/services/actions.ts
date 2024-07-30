"use server";
import { CommonActionState } from "@/modules/common/types/action";
import { createAsesorService } from ".";
import { CreateAsesorReqValidator } from "../types";
import { BaseFormActionService } from "@/modules/common/services/action";
import { clientInfoService } from "@/modules/dashboard/services";

export async function createAsesorForm(
  state: CommonActionState,
  payload: FormData
): Promise<CommonActionState> {
  const clientInfo = await clientInfoService();
  if (clientInfo.errors || !clientInfo.data) return clientInfo;

  payload.set('clientId', clientInfo.data.id.toString());
  return await BaseFormActionService(
    state,
    payload,
    CreateAsesorReqValidator,
    createAsesorService
  );
}
