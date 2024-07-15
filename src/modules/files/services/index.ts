import {
  apiSecureDelete,
  apiSecureGet,
  apiSecurePost,
  apiSecurePut,
} from "@/modules/common/services";
import {
  CreateDiretoryReq as CreateDirectoryReq,
  CreateDirectoryRes,
  DeleteDirectoryReq,
  DeleteDirectoryRes,
  DeleteDocumentReq,
  DeleteDocumentRes,
  Directory,
  DownloadDocumentRes,
  UpdateDirectoryReq,
  UpdateDirectoryRes,
} from "../types";

export async function getDirectoryService(
  id?: number
): Promise<Directory | null> {
  return await apiSecureGet<Directory>(`/directory-tree/parent/${id}`);
}

export async function getDirectoryChildService(id?: number) {
  return await apiSecureGet(`/directory-tree/child/${id}`);
}

export async function getDirectoryRouteService(
  id?: number
): Promise<Directory[] | null> {
  return await apiSecureGet<Directory[]>(`/directory-tree/route/${id}`);
}

export async function createDirectoryService(
  req: CreateDirectoryReq
): Promise<CreateDirectoryRes | null> {
  return await apiSecurePost<CreateDirectoryRes>("/directory-tree", req);
}

export async function updateDiretoryService(
  req: UpdateDirectoryReq
): Promise<DeleteDirectoryRes | null> {
  return await apiSecurePut<UpdateDirectoryRes>(
    `/directory-tree/update/${req.directoryId}`,
    req
  );
}

export async function deleteDiretoryService(
  req: DeleteDirectoryReq
): Promise<DeleteDirectoryRes | null> {
  return await apiSecureDelete<DeleteDirectoryRes>(
    `/directory-tree/delete/${req.id}`
  );
}

export async function deleteDocumentService(
  req: DeleteDocumentReq
): Promise<DeleteDocumentRes | null> {
  return await apiSecureDelete<DeleteDocumentRes>(
    `/document/${req.id}`
  );
}

export async function downloadDocumentService(
  req: DeleteDocumentReq
): Promise<DownloadDocumentRes | null> {
  return await apiSecureGet<DownloadDocumentRes>(
    `/document/download/${req.id}`
  );
}
