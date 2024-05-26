"use client"
import { Button } from "@/modules/common/components/button"
import { signOut } from "next-auth/react"

export function SignOut() {

    return <Button onClick={async () => { await signOut({ redirect: true, callbackUrl: "/login" }) }} type="submit">Cerrar sesión</Button>
}
