"use server";
import { CommonActionState } from "@/modules/common/types/action";
import { createAsesorService } from ".";
import { CreateAsesorReqValidator } from "../types";
import { clientInfoService } from "@/modules/dashboard/services";






export async function createAsesorForm(
    prevState: CommonActionState,
    formData: FormData
): Promise<CommonActionState> {
    const entries = Object.fromEntries(formData.entries());
    const validateFields = CreateAsesorReqValidator.safeParse(entries);

    if (!validateFields.success) {
        return {
            errors: validateFields.error?.flatten().fieldErrors,
            message: "Error",
        };
    }
    const client = await clientInfoService()
    if (!client) {
        return {
            errors: {},
            message: "Error",
        };

    }

    const response = await createAsesorService({ clientId: client?.id, about: validateFields.data.about });
    if (!response) {
        return {
            errors: {},
            message: "Error",
        };
    }

    return {
        message: "Bienvenido",
    };
}
