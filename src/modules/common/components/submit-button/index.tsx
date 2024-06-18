"use client";

import { useFormStatus } from "react-dom";
import { Button } from "../button";

type Props = {
  children: React.ReactNode;
  className?: string;
};

export function SubmitButton({ className, children }: Props) {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" isLoading={pending} className={className}>
      {children}
    </Button>
  );
}
