"use server";

import { CommonActionState } from "@/modules/common/types/action";
import {
  createDirectoryService,
  createDocumentService,
  createDocumentsService,
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
  CreateDocumentReqValidator,
  DeleteDirectoryReqValidator,
  DeleteDocumentReqValidator,
  DownloadDocumentReqValidator,
  RenameDocumentReqValidator,
  UpdateDirectoryReqValidator,
} from "../types";
import { BaseFormActionService } from "@/modules/common/services/action";

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
  state: CommonActionState,
  payload: FormData
): Promise<CommonActionState> {
  return await BaseFormActionService(
    state,
    payload,
    CreateDirectoryReqValidator,
    createDirectoryService
  );
}

export async function deleteDiretoryForm(
  state: CommonActionState,
  payload: FormData
): Promise<CommonActionState> {
  return await BaseFormActionService(
    state,
    payload,
    DeleteDirectoryReqValidator,
    deleteDiretoryService
  );
}

export async function createDocumentForm(
  state: CommonActionState,
  payload: FormData
): Promise<CommonActionState> {
  return await BaseFormActionService(
    state,
    payload,
    CreateDocumentReqValidator,
    createDocumentsService
  );
}

export async function updateDiretoryForm(
  state: CommonActionState,
  payload: FormData
): Promise<CommonActionState> {
  return await BaseFormActionService(
    state,
    payload,
    UpdateDirectoryReqValidator,
    updateDiretoryService
  );
}

export async function downloadDocumentForm(
  state: CommonActionState,
  payload: FormData
): Promise<CommonActionState> {
  return await BaseFormActionService(
    state,
    payload,
    DownloadDocumentReqValidator,
    downloadDocumentService
  );
}

export async function deleteDocumentForm(
  state: CommonActionState,
  payload: FormData
): Promise<CommonActionState> {
  return await BaseFormActionService(
    state,
    payload,
    DeleteDocumentReqValidator,
    deleteDocumentService
  );
}

export async function renameDocumentForm(
  state: CommonActionState,
  payload: FormData
): Promise<CommonActionState> {
  return await BaseFormActionService(
    state,
    payload,
    RenameDocumentReqValidator,
    renameDocumentService
  );
}
