import { CommonServiceRes } from "@/modules/common/types";
import { UpdateClientInfoReq, UpdateUserPhotoReq } from "../types";
import {
  apiSecureGet,
  apiSecureMethodPostFile,
  apiSecurePut,
} from "@/modules/common/services";

export async function updateUserInfoService(
  req: UpdateClientInfoReq
): Promise<CommonServiceRes<boolean | null>> {
  try {
    const res = await apiSecurePut<boolean | null>(`/client/update/${req.id}`,
      req
    );
    if (!res) {
      return { errors: [["No se ha actualizado la informacion."]] };
    }
    return {
      messages: ["Informacion Actualizada"],
    };
  } catch (error) {
    const e = error as Error;
    return { errors: [[e.message]] };
  }
}

export async function updatePhotoUserService(
  req: UpdateUserPhotoReq
): Promise<CommonServiceRes<boolean | null>> {
  try {
    const formData = new FormData();
    formData.append("photo", req.photo);
    const res = await apiSecureMethodPostFile<boolean | null>(
      `/client/photo/${req.id}`,
      formData
    );
    if (!res) {
      return {
        errors: [["No se ha actualizado la foto de perfil."]],
      };
    }
    return {
      messages: ["Se ha actualizado la foto de perfil."],
    };
  } catch (error) {
    const e = error as Error;
    return { errors: [[e.message]] };
  }
}

export async function getPhotoUserService(id: number): Promise<string | null> {
  return await apiSecureGet<string | null>(`/client/photo/${id}`);
}
