"use server";
import { signIn } from "@/auth";
import { AuthError } from "next-auth";
import {
  changePasswordService,
  registerService,
  resetPasswordService,
} from ".";
import { z } from "zod";
import { StateChangePasword, StateResetPassword } from "../types/";
import { SignUpRoleType } from "../context/signup";
import { CommonActionState } from "@/modules/common/types/action";
import { BaseFormActionService } from "@/modules/common/services/action";

const ChangePassword = z.object({
  token: z.string(),
  password: z.string().min(6).max(10),
  passwordReply: z.string().min(6).max(10),
});
const ResetPassword = z.object({
  email: z.string().email(),
});

const Register = z.object({
  givenName: z.string(),
  surname: z.string(),
  email: z.string().email(),
  password: z.string().min(6).max(10),
  role: z.nativeEnum(SignUpRoleType),
});

export async function authenticate(
  prevState: string | undefined,
  formData: FormData
) {
  try {
    await signIn("credentials", formData);
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

export async function resetPassword(
  state: CommonActionState,
  payload: FormData
): Promise<CommonActionState> {
  return await BaseFormActionService(
    state,
    payload,
    ResetPassword,
    resetPasswordService
  );
}

export async function changePassword(
  token: string,
  prevState: StateChangePasword,
  formData: FormData
): Promise<StateChangePasword> {
  const validateFields = ChangePassword.safeParse({
    token: token,
    password: formData.get("password"),
    passwordReply: formData.get("passwordReply"),
  });

  if (validateFields.success) {
    if (validateFields.data.password === validateFields.data.passwordReply) {
      const response = await changePasswordService(
        validateFields.data.token,
        validateFields.data.password
      );
      if (response) {
        return {
          message: "La contraseña ha sido actualizada",
        };
      } else {
        return {
          errors: {},
          message: "Error",
        };
      }
    }
  }
  return {
    errors: validateFields.error?.flatten().fieldErrors,
    message: "Error",
  };
}

export async function registerFormAction(
  state: CommonActionState,
  payload: FormData
) {
  return await BaseFormActionService(state, payload, Register, registerService);
}
