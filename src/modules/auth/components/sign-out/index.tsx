"use client";
import { handleSignOut } from "@/modules/auth/actions";
import { SubmitButton } from "@/modules/common/components/submit-button";
import { useRouter } from "next/navigation";
import { ROUTES_AUTH } from "../../types/auth";

type SignOutProps = {
  className?: string;
};

export function SignOut({ className }: SignOutProps) {
  const router = useRouter();

  const handleClieck = async () => {
    await handleSignOut();
    router.push("/");
  };

  return (
    <SubmitButton onClick={handleClieck} className={className}>
      Cerrar Sesión
    </SubmitButton>
  );
}
