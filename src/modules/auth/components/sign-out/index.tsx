import { signOut } from "@/auth"
import { SubmitButton } from "@/modules/common/components/submit-button"

export function SignOut() {

    return <form action={async () => {
        'use server'
        await signOut()
    }}>
        <SubmitButton>Salir</SubmitButton>
    </form>
}
