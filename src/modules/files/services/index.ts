import {
  apiSecureDelete,
  apiSecureGet,
  apiSecurePostFormData,
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
  UpdateDocumentReq,
  UpdateDocumentRes,
  DownloadDocumentReq,
  UpdateDocumentStatusRes,
  UpdateDocumentStatusReq,
} from '../types';
import {CommonServiceRes} from '@/modules/common/types';

export async function getDirectoryService(
  id?: number,
  institutionId?: number
): Promise<Directory | null> {
  let path = `/directory-tree/parent/${id}`;
  if (institutionId) {
    path += `?institution=${institutionId}`;
  }
  return await apiSecureGet<Directory>(path);
}

export async function getDirectoryChildService(id?: number, institutionId?: number) {
  let path = `/directory-tree/child/${id}`;
  if (institutionId) {
    path += `?institution=${institutionId}`;
  }
  return await apiSecureGet(path);
}

export async function getDirectoryRouteService(
  id?: number,
  institutionId?: number
): Promise<Directory[] | null> {
  let path = `/directory-tree/route/${id}`;
  if (institutionId) {
    path += `?institution=${institutionId}`;
  }
  return await apiSecureGet<Directory[]>(path);
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
    return await apiSecurePostFormData<any>('/document', createDocument);
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
  req: DownloadDocumentReq
): Promise<CommonServiceRes<DownloadDocumentRes | null>> {
  try {
    let path = `/document/download/${req.id}`;
    if (req.institution) {
      path += `?institution=${req.institution}`;
    }
    const res = await apiSecureGet<DownloadDocumentRes>(path);

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

export async function updateDocumentService(
  req: UpdateDocumentReq
): Promise<CommonServiceRes<UpdateDocumentRes | null>> {
  try {
    const formData = new FormData();
    formData.set('file', req.file);
    formData.set('data', JSON.stringify({id: req.id}));
    const res = await apiSecurePostFormData<any>(`/document/version`, formData);
    if (!res) {
      return {
        errors: [['No se ha actualizado el documento']],
      };
    }
    return {
      messages: ['Se ha actualizado documento exitosamente.'],
    };
  } catch (error) {
    const e = error as Error;
    return {
      errors: [[e.message]],
    };
  }
}

export async function updateDocumentStatusService(
  req: UpdateDocumentStatusReq
): Promise<CommonServiceRes<UpdateDocumentStatusRes | null>> {
  try {
    const res = await apiSecurePut<any>(`/document/status`, req);
    if (!res) {
      return {
        errors: [['No se ha actualizado estado del documento']],
      };
    }
    return {
      messages: ['Se ha actualizado estado del documento exitosamente.'],
    };
  } catch (error) {
    const e = error as Error;
    return {
      errors: [[e.message]],
    };
  }
}
