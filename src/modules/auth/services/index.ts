import { apiGet, apiPost } from "@/modules/common/services";
import { CommonServiceRes } from "@/modules/common/types";
import {
  ChangePasswordReq,
  ChangePasswordRes,
  LoginReq,
  LoginRes,
  RegisterReq,
  RegisterRes,
} from "../types/services";
import { signIn } from "@/auth";

export async function resetPasswordService(
  req: any
): Promise<CommonServiceRes<boolean>> {
  try {
    const res = await apiPost("/client/reset-password", req);
    if (!res) {
      return {
        errors: [
          [
            "No es posible enviar correo electrónico con instrucciones para restablecer su contraseña",
          ],
        ],
      };
    }
    return {
      data: !!res,
      message:
        "Hemos enviado un correo electrónico con instrucciones para restablecer su contraseña",
    };
  } catch (e) {
    const error = e as Error;
    return { errors: [[error.message]] };
  }
}

export async function loginService(
  req: LoginReq
): Promise<CommonServiceRes<LoginRes>> {
  try {
    const res = await apiPost<RegisterRes>("/client/login", req);

    return {
      data: {
        token: res?.token,
      },
      message: "inicio de sesión exitosamente",
    };
  } catch (e) {
    const error = e as Error;
    return { errors: [[error.message]] };
  }
}

export async function registerService(
  req: RegisterReq
): Promise<CommonServiceRes<RegisterRes>> {
  try {
    const data = await apiPost<RegisterRes>("/client", {
      ...req,
      role: parseInt(req.role),
    });

    if (!data?.token)
      return { errors: [["El usuario no ha sido registrado."]] };

    const resData = await signIn("credentials", {
      redirect: false,
      email: req.email,
      password: req.password,
    });

    return {
      data: resData,
      message: "El usuario ha sido registrado exitosamente.",
    };
  } catch (e) {
    const error = e as Error;
    return { errors: [[error.message]] };
  }
}

export async function changePasswordService(
  req: ChangePasswordReq
): Promise<CommonServiceRes<ChangePasswordRes>> {
  if (req.password !== req.passwordReply) {
    return { errors: [["Contrasena no coincide."]] };
  }
  try {
    const res = await apiPost(
      `${process.env.API_URL}/client/reset-password-token`,
      { token: req.token, password: req.password }
    );

    if (!res)
      return {
        data: true,
        message: "Se ha Cambio de contrasena.",
      };

    return { errors: [["No se ha cambio contrasena."]] };
  } catch (e) {
    const error = e as Error;
    return { errors: [[error.message]] };
  }
}

export async function validateTokenPasswordResetService(
  token: string
): Promise<boolean> {
  try {
    const res = await apiGet(
      `${process.env.API_URL}/client/validate/reset-password-token/?token=${token}`
    );
    if (!res) return false;
    return true;
  } catch (e) {
    return false;
  }
}
