"use server"
import { signIn } from '@/auth';
import { AuthError } from 'next-auth';
import { changePasswordService, resetPasswordService } from '.';
import { z } from 'zod';
import { StateChangePasword, StateResetPassword } from '../types';

const ChangePassword = z.object({
    token: z.string(),
    password: z.string().min(6).max(10),
    passwordReply: z.string().min(6).max(10)
});
const ResetPassword = z.object({
    email: z.string().email(),
});


export async function authenticate(
    prevState: string | undefined,
    formData: FormData,
) {
    try {
        await signIn('credentials', formData);
    } catch (error) {
        if (error instanceof AuthError) {
            switch (error.type) {
                case 'CredentialsSignin':
                    return 'Credenciales invalidas.';
                default:
                    return 'Error.';
            }
        }
        throw error;
    }
}

export async function resetPassword(
    prevState: StateResetPassword,
    formData: FormData,
): Promise<StateResetPassword> {
    const validateFields = ResetPassword.safeParse({
        email: formData.get("email")
    })

    if (validateFields.success) {
        const response = await resetPasswordService(validateFields.data.email)
        if (response) {
            return {
                message: "Hemos enviado un correo electrónico con instrucciones para restablecer su contraseña"
            }

        } else {
            return {
                errors: {
                },
                message: 'Error'
            }
        }
    }
    return {
        errors: validateFields.error.flatten().fieldErrors,
        message: 'Error'
    }

}

export async function changePassword(
    token: string,
    prevState: StateChangePasword,
    formData: FormData,
): Promise<StateChangePasword> {
    const validateFields = ChangePassword.safeParse({
        token: token,
        password: formData.get("password"),
        passwordReply: formData.get("passwordReply")
    })

    if (validateFields.success) {
        if (validateFields.data.password === validateFields.data.passwordReply) {
            const response = await changePasswordService(validateFields.data.token, validateFields.data.password)
            if (response) {
                return {
                    message: 'La contrasena ha sido actualizada'
                }
            } else {
                return {
                    errors: {
                    },
                    message: 'Error'
                }


            }


        }
    }
    return {
        errors: validateFields.error?.flatten().fieldErrors,
        message: 'Error'
    }

}
