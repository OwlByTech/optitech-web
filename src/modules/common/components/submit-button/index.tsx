"use client";

import { useFormStatus } from "react-dom";
import { Button } from "../button";
import { clx } from "@/utils/clx";
import { ButtonProps } from "@nextui-org/react";

export function SubmitButton({ className, children, ...props }: ButtonProps) {
    const { pending } = useFormStatus();

    return (
        <Button type="submit" isLoading={pending} {...props} className={clx("font-bold rounded-lg", className)}>
            {children}
        </Button>
    );
}
