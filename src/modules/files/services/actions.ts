"use server"

import { getDirectoryService } from "."


export async function getDirectoryAction(
    id?: number,

) {
    const response = await getDirectoryService(id)
    if (response) {

        return {
            message: "Institución creada exitosamente",
            directory: response

        }

    }
    return {
        errors: {
            api: "Error conexion servidor"
        },
    }
}


