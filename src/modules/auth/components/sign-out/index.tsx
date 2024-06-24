import { handleSignOut } from "@/modules/auth/actions";
import { SubmitButton } from "@/modules/common/components/submit-button";

type SignOutProps = {
  className?: string;
};

export function SignOut({ className }: SignOutProps) {
  return (
    <form action={handleSignOut}>
      <SubmitButton className={className}>Salir</SubmitButton>
    </form>
  );
}
