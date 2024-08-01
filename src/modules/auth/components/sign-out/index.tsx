"use client";
import { SubmitButton } from "@/modules/common/components/submit-button";
import { useRouter } from "next/navigation";
import { signOutAction } from "../../services/actions";

type SignOutProps = {
  className?: string;
};

export function SignOut({ className }: SignOutProps) {
  const router = useRouter();

  const handleClieck = async () => {
    await signOutAction();
    router.push("/");
  };

  return (
    <SubmitButton onClick={handleClieck} className={className}>
      Cerrar Sesión
    </SubmitButton>
  );
}
