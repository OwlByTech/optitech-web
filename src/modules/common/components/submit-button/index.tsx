"use client"

import { useFormStatus } from "react-dom"
import { Button } from "../button"

type Props = {
    children: React.ReactNode
}

export function SubmitButton({
    children,
}: Props) {
    const { pending } = useFormStatus()

    return (
        <Button type='submit' isLoading={pending}  >
            {children}
        </Button>
    )
}
