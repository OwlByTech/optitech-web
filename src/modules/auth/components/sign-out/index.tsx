import { signOut } from "@/auth";
import { SubmitButton } from "@/modules/common/components/submit-button";

type SignOutProps = {
  className?: string;
};

export function SignOut({ className }: SignOutProps) {
  return (
    <form
      action={async () => {
        "use server";
        await signOut();
      }}
    >
      <SubmitButton className={className}>Salir</SubmitButton>
    </form>
  );
}
