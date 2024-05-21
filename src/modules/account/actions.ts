"use server"

import { signIn } from "@/auth"
import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

type Validation = {
    state: boolean
}

export async function loginUser(
    _currentState: unknown,
    formData: FormData
): Promise<Validation | undefined> {

    try {
        await new Promise((resolve) => { setTimeout(resolve, 3000) })
        const response = await signIn("credentials", { email: formData.get("email"), password: formData.get("password"), redirect: false });
        return { state: true }
    } catch (e) {
        return { state: false }
    }

}
