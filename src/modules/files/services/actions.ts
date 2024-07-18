"use server"

import { getDirectoryChildService, getDirectoryService } from "."


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
export async function getDirectoryChildAction(
    id?: number,

) {
    const response = await getDirectoryChildService(id)
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
