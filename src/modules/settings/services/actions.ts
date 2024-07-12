"use server"

import { z } from "zod"
import { StateUpdateUser } from '../types'
import { updateUserInfo } from ".";

const UserInfo = z.object({
    id: z.string(),
    givenName: z.string(),
    surname: z.string(),
    email: z.string().email()
})

export async function updateUserForm(
    prevState: StateUpdateUser,
    formData: FormData,
): Promise<StateUpdateUser> {
    const entries = Object.fromEntries(formData.entries());
    const validateFields = UserInfo.safeParse(entries);


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