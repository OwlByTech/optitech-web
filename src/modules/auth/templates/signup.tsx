"use client";
import { useFormState } from "react-dom";
import { authenticate } from "../services/actions";
import { Input } from "../../common/components/input";
import { InputPassword } from "../../common/components/input-password";
import { SubmitButton } from "../../common/components/submit-button";
import { usePathname, useRouter } from "next/navigation";
import { ROUTES_AUTH } from "../types/auth";

import { useEffect } from "react";

export default function SignUp() {
  const [errorMessage, dispatch] = useFormState(authenticate, undefined);
  const route = useRouter();
  const pathname = usePathname();
  useEffect(() => {
    if (pathname === "/") route.push(ROUTES_AUTH.LOGIN);
  }, [pathname]);

  return (
    <section>
      <div></div>
      <div></div>
    </section>
  );
}
