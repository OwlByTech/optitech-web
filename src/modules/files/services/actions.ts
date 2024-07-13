"use server";

import { CommonActionState } from "@/modules/common/types/action";
import {
  createDirectoryService,
  getDirectoryChildService,
  getDirectoryService,
} from ".";
import { z } from "zod";
import { CreateDirectoryReqValidator, CreateDiretoryReq } from "../types";

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
