import { ErrorValidatePasswordReset } from "@/modules/auth/components/error-validate-password-reset";
import { validateTokenPasswordResetService } from "@/modules/auth/services";
import ChangePassword from "@/modules/auth/templates/change-password";

export const metadata = {
    title: "Cambiar contraseña",
};

export default async function Page({ searchParams }: { searchParams: { token: string } }) {
    const tokenValidate = await validateTokenPasswordResetService(searchParams.token)
    return tokenValidate ? <ChangePassword token={searchParams.token} /> : <ErrorValidatePasswordReset />;
}
