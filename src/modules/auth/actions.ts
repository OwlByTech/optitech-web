"use server"

import { signIn } from "next-auth/react";

type Validation = {
    state: boolean
}

export async function loginUser(
    _currentState: unknown,
    formData: FormData
): Promise<Validation | undefined> {

    try {
        await new Promise((resolve) => { setTimeout(resolve, 3000) })
        const response = await signIn("credentials", { email: formData.get("email"), password: formData.get("password") });
        return { state: true }
    } catch (e) {
        console.log(e)
        return { state: false }
    }

}
