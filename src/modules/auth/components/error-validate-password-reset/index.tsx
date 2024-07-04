"use client"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import { toast } from "sonner"
import { ROUTES_AUTH } from "../../types/auth"

export function ErrorValidatePasswordReset() {
    useEffect(() => {
        toast("Error al restablecer la contraseña intentalo nuevamente")
    }, [])
    const router = useRouter()
    router.replace(ROUTES_AUTH.RESET_PASSWORD)

    return <></>
}
