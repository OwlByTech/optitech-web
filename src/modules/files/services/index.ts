import { apiSecureGet, apiSecurePost } from "@/modules/common/services";
import {
  CreateDiretoryReq as CreateDirectoryReq,
  CreateDirectoryRes,
} from "../types";

export async function getDirectoryService(id?: number) {
  return await apiSecureGet(`/directory-tree/parent/${id}`);
}

export async function getDirectoryChildService(id?: number) {
  return await apiSecureGet(`/directory-tree/child/${id}`);
}

export async function getDirectoryRouteService(id?: number) {
  return await apiSecureGet(`/directory-tree/route/${id}`);
}

export async function createDirectoryService(
  createDirectoryReq: CreateDirectoryReq
): Promise<CreateDirectoryRes | null> {
  return await apiSecurePost<CreateDirectoryRes>(
    "/directory-tree",
    createDirectoryReq
  );
}
