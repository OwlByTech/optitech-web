"use server";

import { CommonActionState } from "@/modules/common/types/action";
import { updatePhotoUserService, updateUserInfoService } from ".";
import { UserInfo, UserPhoto } from "../types";
import { BaseFormActionService } from "@/modules/common/services/action";

export async function updateUserForm(
  state: CommonActionState,
  payload: FormData
): Promise<CommonActionState> {
  return await BaseFormActionService(
    state,
    payload,
    UserInfo,
    updateUserInfoService
  );
}

export async function updateUserPhoto(
  state: CommonActionState,
  payload: FormData
): Promise<CommonActionState> {
  return await BaseFormActionService(
    state,
    payload,
    UserPhoto,
    updatePhotoUserService
  );
}
