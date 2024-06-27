"use client"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import { toast } from "sonner"

export function ErrorValidatePasswordReset() {
    useEffect(() => {

        toast("Error al restablecer la contraseña intentalo nuevamente")
    }, [])
    const router = useRouter()
    router.replace("/reset-password")

    return <></>
}
