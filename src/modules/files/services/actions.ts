"use server";

import { CommonActionState } from "@/modules/common/types/action";
import {
  createDirectoryService,
  deleteDiretoryService,
  deleteDocumentService,
  downloadDocumentService,
  getDirectoryChildService,
  getDirectoryService,
  renameDocumentService,
  updateDiretoryService,
} from ".";
import {
  CreateDirectoryReqValidator,
  CreateDiretoryReq,
  DeleteDirectoryReqValidator,
  DeleteDocumentReqValidator,
  DownloadDirectoryReqValidator,
  DownloadDocumentReqValidator,
  RenameDocumentReqValidator,
  UpdateDirectoryReqValidator,
} from "../types";
import { RenameDocumentOption } from "../components/folder-document-options/document/rename";

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
