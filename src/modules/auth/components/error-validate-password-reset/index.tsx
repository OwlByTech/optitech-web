"use client"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import { toast } from "react-toastify"

export function ErrorValidatePasswordReset() {
    useEffect(() => {

        toast("Error al restablecer la contrasena intentalo nuevamente")
    }, [])
    const router = useRouter()
    router.replace("/reset-password")



    return <></>
}
