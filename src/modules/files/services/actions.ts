"use server";

import { CommonActionState } from "@/modules/common/types/action";
import {
    createDirectoryService,
    createDocumentService,
    deleteDiretoryService,
    getDirectoryChildService,
    getDirectoryService,
    updateDiretoryService,
} from ".";
import {
    CreateDirectoryReqValidator,
    CreateDocumentReqValidator,
    DeleteDirectoryReqValidator,
    UpdateDirectoryReqValidator,
} from "../types";

export async function getDirectoryAction(id?: number) {
    const response = await getDirectoryService(id);
    if (response) {
        return {
            message: "Institución creada exitosamente",
            directory: response,
        };
    }
    return {
        errors: {
            api: "Error conexion servidor",
        },
    };
}

export async function getDirectoryChildAction(id?: number) {
    const response = await getDirectoryChildService(id);
    if (response) {
        return {
            message: "Institución creada exitosamente",
            directory: response,
        };
    }
    return {
        errors: {
            api: "Error conexion servidor",
        },
    };
}

export async function createDiretoryForm(
    prevState: CommonActionState,
    formData: FormData
): Promise<CommonActionState> {
    const entries = Object.fromEntries(formData.entries());
    const validateFields = CreateDirectoryReqValidator.safeParse(entries);

    if (!validateFields.success) {
        return {
            errors: validateFields.error?.flatten().fieldErrors,
            message: "Error",
        };
    }

    const response = await createDirectoryService(validateFields.data);

    if (!response) {
        return {
            errors: {},
            message: "Error",
        };
    }

    return {
        message: `Directorio ${response.name} creado exitosamente.`,
    };
}

export async function deleteDiretoryForm(
    prevState: CommonActionState,
    formData: FormData
): Promise<CommonActionState> {
    const entries = Object.fromEntries(formData.entries());
    const validateFields = DeleteDirectoryReqValidator.safeParse(entries);

    if (!validateFields.success) {
        return {
            errors: validateFields.error?.flatten().fieldErrors,
            message: "Error",
        };
    }

    const response = await deleteDiretoryService(validateFields.data);

    if (!response) {
        return {
            errors: {},
            message: "Error",
        };
    }

    return {
        message: `Directorio ${validateFields.data.id} eliminado exitosamente.`,
    };
}


export async function createDocumentForm(
    prevState: CommonActionState,
    formData: FormData
): Promise<CommonActionState> {
    const entries = Object.fromEntries(formData.entries());

    const validateFields = CreateDocumentReqValidator.safeParse(entries);
    if (!validateFields.success) {
        return {
            errors: validateFields.error?.flatten().fieldErrors,
            message: "Error",
        };
    }
    const data = new FormData()
    data.append('data', `{ "directoryId": ${validateFields.data.directoryId}, "status": "${validateFields.data.status}"}`);
    data.append('file', validateFields.data.file)
    const response = await createDocumentService(data);
    if (!response) {
        return {
            errors: {},
            message: "Error",
        };
    }


    return {
        message: `Directorio  creado exitosamente.`,
    };
}

export async function updateDiretoryForm(
    prevState: CommonActionState,
    formData: FormData
): Promise<CommonActionState> {
    const entries = Object.fromEntries(formData.entries());
    const validateFields = UpdateDirectoryReqValidator.safeParse(entries);

    if (!validateFields.success) {
        return {
            errors: validateFields.error?.flatten().fieldErrors,
            message: "Error",
        };
    }
    const response = await updateDiretoryService(validateFields.data);

    if (!response) {
        return {
            errors: {},
            message: "Error",
        };
    }

    return {
        message: `Se ha renombrado directorio exitosamente.`,
    };
}
