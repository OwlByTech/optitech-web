
import {
    apiSecureDelete,
    apiSecureGet,
    apiSecureMethodPostFile,
    apiSecurePost,
    apiSecurePut,
} from "@/modules/common/services";
import {
    CreateDiretoryReq as CreateDirectoryReq,
    CreateDirectoryRes,
    DeleteDirectoryReq,
    DeleteDirectoryRes,
    Directory,
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
    createDirectoryReq: CreateDirectoryReq
): Promise<CreateDirectoryRes | null> {
    return await apiSecurePost<CreateDirectoryRes>(
        "/directory-tree",
        createDirectoryReq
    );
}

export async function deleteDiretoryService(
    DeleteDirectoryReq: DeleteDirectoryReq
): Promise<DeleteDirectoryRes | null> {
    return await apiSecureDelete<DeleteDirectoryRes>(
        `/directory-tree/delete/${DeleteDirectoryReq.id}`
    );
}

export async function createDocumentService(
    createDocument: FormData
): Promise<any | null> {
    return await apiSecureMethodPostFile<any>(
        "/document",
        createDocument
    );
}

export async function updateDiretoryService(
    req: UpdateDirectoryReq
): Promise<DeleteDirectoryRes | null> {
    return await apiSecurePut<UpdateDirectoryRes>(
        `/directory-tree/update/${req.directoryId}`,
        req
    );
}


