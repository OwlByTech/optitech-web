"use server"
import { signIn } from '@/auth';
import { AuthError } from 'next-auth';
import { resetPasswordService } from '.';

// ...

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
    prevState: string | undefined,
    formData: FormData,
) {
    const response = await resetPasswordService(formData.get("email"))
    if (response) {
        return {
            state: true,
            message: "Hemos enviado un correo electrónico con instrucciones para restablecer su contraseña"
        }

    } else {
        return {
            state: false,
            message: 'Error'
        }
    }
}
