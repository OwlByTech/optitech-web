"use server"

import { string, z } from "zod";
import { createInstitutionService } from ".";
import { Institution } from "../types";
const CreateInstitution = z.object({
    name: z.string(),
    description: z.string(),
    services: z.number().array().min(1)
})

type StateCreateInstitution = {
    institution?: Institution
    errors?: {
        api?: string
        name?: string[];
        description?: string[];
        services?: string[];
    };
    message?: string | null;
};



export async function createInstitution(
    name?: string,
    description?: string,
    services?: number[],
    prevState: StateCreateInstitution,
    formData: FormData,

): Promise<StateCreateInstitution> {
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
                institution: response
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


