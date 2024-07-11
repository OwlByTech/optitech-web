"use server"

import { z } from "zod"
import { StateUpdateUser } from '../types'
import { updateUserInfo } from ".";

const UserInfo = z.object({
    token: z.string(),
    id: z.number(),
    name: z.string(),
    surname: z.string(),
    email: z.string()
})

export async function updateUser(
    prevState: StateUpdateUser,
    formData: FormData,
): Promise<StateUpdateUser> {
    const entries = Object.fromEntries(formData.entries());
    const validateFields = UserInfo.safeParse(entries)
    if (!validateFields.success) {
        return {
            errors: validateFields.error?.flatten().fieldErrors,
            message: 'Error'
        }
    }

    const response = await updateUserInfo(validateFields.data)
    if (!response) {
        return {
            errors: {},
            message: 'Error'
        }
    }

    return {
        message: 'Informacion Actualizada'
    }
}