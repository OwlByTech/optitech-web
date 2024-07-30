"use server"

import { createInstitutionService, updateLogoInstitutionService } from ".";
import { CommonActionState } from "@/modules/common/types/action";
import { CreateInstitution, InstitutionLogo } from "../types";

export async function createInstitution(
    name?: string,
    description?: string,
    services?: number[],
    prevState: CommonActionState,
    formData: FormData,

): Promise<CommonActionState> {

    const validateFields = CreateInstitution.safeParse({
        name: name,
        description: description,
        services: services,
    })
    if (validateFields.success) {
        const response = await createInstitutionService(
            {
                ...validateFields.data, logo: formData.get("logo") as File
            })
        if (response) {

            return {
                message: "Institución creada exitosamente",
            }

        } else {
            return {
                errors: {
                    api: "Error conexion servidor"
                },
            }
        }
    }
    return {
        errors: validateFields.error.flatten().fieldErrors,
        message: 'Error'
    }

}

export async function updateLogoInstitution(
    prevState: CommonActionState,
    formData: FormData,
): Promise<CommonActionState> {
    const entries = Object.fromEntries(formData.entries());
    const validateFields = InstitutionLogo.safeParse(entries);
    if (!validateFields.success) {
        return {
            errors: validateFields.error?.flatten().fieldErrors,
            message: 'Error'
        }
    }

    const response = await updateLogoInstitutionService(validateFields.data.id, validateFields.data.photo)
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


