"use server";
import { signIn, signOut } from "@/auth";
import { AuthError } from "next-auth";
import {
  changePasswordService,
  registerService,
  resetPasswordService,
} from ".";
import { CommonActionState } from "@/modules/common/types/action";
import { BaseFormActionService } from "@/modules/common/services/action";
import {
  ChangePasswordValidator,
  RegisterValidator,
  ResetPasswordValidator,
} from "../types/services";

export async function authenticate(
  state: string | undefined,
  payload: FormData
) {
  try {
    await signIn("credentials", payload);
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return "Credenciales invalidas.";
        default:
          return "Error.";
      }
    }
    throw error;
  }
}

export async function resetPasswordAction(
  state: CommonActionState,
  payload: FormData
): Promise<CommonActionState> {
  return await BaseFormActionService(
    state,
    payload,
    ResetPasswordValidator,
    resetPasswordService
  );
}

export async function changePasswordAction(
  token: string,
  state: CommonActionState,
  payload: FormData
): Promise<CommonActionState> {
  return await BaseFormActionService(
    state,
    payload,
    ChangePasswordValidator,
    changePasswordService
  );
}

export async function registerFormAction(
  state: CommonActionState,
  payload: FormData
) {
  return await BaseFormActionService(
    state,
    payload,
    RegisterValidator,
    registerService
  );
}

export async function handleSignOut() {
  await signOut();
}