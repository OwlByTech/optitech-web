import {
  ApiContentType,
  apiSecureDelete,
  apiSecureGet,
  apiSecureMethodPostFile,
  apiSecurePost,
  apiSecurePut,
} from '@/modules/common/services';
import {
  CreateDiretoryReq as CreateDirectoryReq,
  CreateDirectoryRes,
  DeleteDirectoryReq,
  DeleteDirectoryRes,
  Directory,
  UpdateDirectoryReq,
  DeleteDocumentReq,
  DeleteDocumentRes,
  DownloadDocumentRes,
  RenameDocumentReq,
  RenameDocumentRes,
  CreateDocumentReq,
} from '../types';
import {CommonServiceRes} from '@/modules/common/types';

export async function getDirectoryService(id?: number): Promise<Directory | null> {
  return await apiSecureGet<Directory>(`/directory-tree/parent/${id}`);
}

export async function getDirectoryChildService(id?: number) {
  return await apiSecureGet(`/directory-tree/child/${id}`);
}

export async function getDirectoryRouteService(id?: number): Promise<Directory[] | null> {
  return await apiSecureGet<Directory[]>(`/directory-tree/route/${id}`);
}

export async function createDirectoryService(
  req: CreateDirectoryReq
): Promise<CommonServiceRes<CreateDirectoryRes | null>> {
  try {
    const res = await apiSecurePost<CreateDirectoryRes>('/directory-tree', req);
    if (!res) {
      return {
        errors: [[`Directorio ${req.name} no ha sido creado.`]],
      };
    }
    return {
      messages: [`Directorio ${req.name} creado exitosamente.`],
    };
  } catch (error) {
    const e = error as Error;
    return {
      errors: [[e.message]],
    };
  }
}

export async function deleteDiretoryService(
  req: DeleteDirectoryReq
): Promise<CommonServiceRes<DeleteDirectoryRes | null>> {
  try {
    const res = await apiSecureDelete<DeleteDirectoryRes>(`/directory-tree/delete/${req.id}`);
    if (!res) {
      return {
        errors: [['Error al eliminar directorio']],
      };
    }
    return {
      messages: [`Directorio ${req.id} eliminado exitosamente.`],
    };
  } catch (error) {
    const e = error as Error;
    return {
      errors: [[e.message]],
    };
  }
}

export async function createDocumentsService(
  req: CreateDocumentReq
): Promise<CommonServiceRes<undefined>> {
  const dataCreate = new FormData();
  dataCreate.set('data', JSON.stringify({directoryId: req.directoryId, status: req.status}));

  const errors: string[] = [];
  const messages: string[] = [];

  let files: File[] = req.files as unknown as File[];
  if (files instanceof File) {
    files = [files];
  }

  for await (const file of files) {
    dataCreate.set('file', file);
    const res = await createDocumentService(dataCreate);
    if (!res) {
      errors.push(`Documento ${file.name} error al cargar`);
    } else {
      messages.push(`Documento ${file.name} cargado exitosamente`);
    }
    dataCreate.delete('file');
  }

  return {
    errors: [errors],
    messages,
  };
}

export async function createDocumentService(createDocument: FormData): Promise<any | null> {
  try {
    return await apiSecureMethodPostFile<any>('/document', createDocument);
  } catch (error) {
    const e = error as Error;
    return e;
  }
}

export async function updateDiretoryService(
  req: UpdateDirectoryReq
): Promise<CommonServiceRes<DeleteDirectoryRes | null>> {
  try {
    const res = await apiSecurePut<any>(`/directory-tree/update/${req.directoryId}`, req);
    if (!res) {
      return {
        errors: [['No se ha renombrado el directorio']],
      };
    }

    return {
      messages: ['Se ha renombrado directorio exitosamente.'],
    };
  } catch (error) {
    const e = error as Error;
    return {
      errors: [[e.message]],
    };
  }
}

export async function deleteDocumentService(
  req: DeleteDocumentReq
): Promise<CommonServiceRes<DeleteDocumentRes | null>> {
  try {
    const res = await apiSecureDelete<DeleteDocumentRes>(`/document/${req.id}`);

    if (!res) {
      return {
        errors: [[`No se ha eliminado el documento.`]],
      };
    }

    return {
      messages: ['Se ha eliminado el documento exitosamente.'],
    };
  } catch (error) {
    const e = error as Error;
    return {
      errors: [[e.message]],
    };
  }
}

export async function downloadDocumentService(
  req: DeleteDocumentReq
): Promise<CommonServiceRes<DownloadDocumentRes | null>> {
  try {
    const res = await apiSecureGet<DownloadDocumentRes>(`/document/download/${req.id}`);

    if (!res) {
      return {
        errors: [['No se ha descargado el documento']],
      };
    }

    return {
      data: res,
      messages: [`Documento ${req.id} descargado`],
    };
  } catch (error) {
    const e = error as Error;
    return {
      errors: [[e.message]],
    };
  }
}

export async function renameDocumentService(
  req: RenameDocumentReq
): Promise<CommonServiceRes<RenameDocumentRes | null>> {
  try {
    const res = await apiSecurePut<RenameDocumentRes>(`/document/update`, req);
    if (!res) {
      return {
        errors: [['No se ha renombrado el documento']],
      };
    }

    return {
      messages: ['Se ha renombrado documento exitosamente.'],
    };
  } catch (error) {
    const e = error as Error;
    return {
      errors: [[e.message]],
    };
  }
}
