"use server"

import { getDirectoryService } from "."


export async function createInstitution(
    id: number,

) {
    const response = await getDirectoryService(id)
    if (response) {

        return {
            message: "Institución creada exitosamente",
            institution: response
        }

    }
    return {
        errors: {
            api: "Error conexion servidor"
        },
    }
}


