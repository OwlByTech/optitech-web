"use client"

import { Button } from '@/modules/common/components/button';
import { useFormStatus } from "react-dom"

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
