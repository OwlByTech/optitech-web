"use server";

import { CommonActionState } from "@/modules/common/types/action";
import {
    createDirectoryService,
    createDocumentService,
    deleteDiretoryService,
    deleteDocumentService,
    downloadDocumentService,
    getDirectoryChildService,
    getDirectoryService,
    renameDocumentService,
    updateDiretoryService,
} from ".";
import { CreateDirectoryReqValidator, CreateDocumentReqValidator, DeleteDirectoryReqValidator, DeleteDocumentReqValidator, DownloadDocumentReqValidator, RenameDocumentReqValidator, UpdateDirectoryReqValidator } from "../types";

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
            api: "Error en la conexión del servidor",
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
            api: "Error en la conexión del servidor",
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
    const data = {
        directoryId: validateFields.data.directoryId,
        status: validateFields.data.status
    }


    const files = formData.getAll("files")
    const responses = await Promise.all(files.map(async (file) => {
        const dataCreate = new FormData()
        dataCreate.set("data", JSON.stringify(data))
        dataCreate.set("file", file)
        const response = await createDocumentService(dataCreate);
        if (!response) {
            return `Documento ${file.name} error al cargar`
        }
        dataCreate.delete("file")

        return `Documento ${file.name} cargado exitosamente`
    }))


    return {
        message: responses
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

export async function downloadDocumentForm(
    prevState: CommonActionState,
    formData: FormData
): Promise<CommonActionState> {
    const entries = Object.fromEntries(formData.entries());
    const validateFields = DownloadDocumentReqValidator.safeParse(entries);

    if (!validateFields.success) {
        return {
            errors: validateFields.error?.flatten().fieldErrors,
            message: "Error",
        };
    }

    const response = await downloadDocumentService(validateFields.data);

    if (!response) {
        return {
            errors: {},
            message: "Error",
        };
    }

    return {
        message: response,
    };
}

export async function deleteDocumentForm(
    prevState: CommonActionState,
    formData: FormData
): Promise<CommonActionState> {
    const entries = Object.fromEntries(formData.entries());
    const validateFields = DeleteDocumentReqValidator.safeParse(entries);

    if (!validateFields.success) {
        return {
            errors: validateFields.error?.flatten().fieldErrors,
            message: "Error",
        };
    }

    const response = await deleteDocumentService(validateFields.data);

    if (!response) {
        return {
            errors: {},
            message: "Error",
        };
    }

    return {
        message: `Documento ${validateFields.data.id} eliminado exitosamente.`,
    };
}

export async function renameDocumentForm(
    prevState: CommonActionState,
    formData: FormData
): Promise<CommonActionState> {
    const entries = Object.fromEntries(formData.entries());
    const validateFields = RenameDocumentReqValidator.safeParse(entries);

    if (!validateFields.success) {
        return {
            errors: validateFields.error?.flatten().fieldErrors,
            message: "Error",
        };
    }

    const response = await renameDocumentService(validateFields.data);

    if (!response) {
        return {
            errors: {},
            message: "Error",
        };
    }

    return {
        message: `Documento ${validateFields.data.name} renombrado exitosamente.`,
    };
}
