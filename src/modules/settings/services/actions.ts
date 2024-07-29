"use server"

import { CommonActionState } from '@/modules/common/types/action';
import { updatePhotoUserService, updateUserInfoService } from '.';
import { UserInfo, UserPhoto } from '../types'

export async function updateUserForm(
    prevState: CommonActionState,
    formData: FormData,
): Promise<CommonActionState> {
    const entries = Object.fromEntries(formData.entries());
    const validateFields = UserInfo.safeParse(entries);


    if (!validateFields.success) {
        return {
            errors: validateFields.error?.flatten().fieldErrors,
            message: 'Error'
        }
    }

    const response = await updateUserInfoService(validateFields.data)
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

export async function updateUserPhoto(
    prevState: CommonActionState,
    formData: FormData,
): Promise<CommonActionState> {
    const entries = Object.fromEntries(formData.entries());
    const validateFields = UserPhoto.safeParse(entries);
    if (!validateFields.success) {
        return {
            errors: validateFields.error?.flatten().fieldErrors,
            message: 'Error'
        }
    }

    const response = await updatePhotoUserService(validateFields.data.id, validateFields.data.photo)
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
