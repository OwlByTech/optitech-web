import { UpdateClientInfoReq } from "../types";
import { apiSecureGet, apiSecureMethodPostFile, apiSecurePut } from "@/modules/common/services";

export async function updateUserInfoService(user: UpdateClientInfoReq): Promise<boolean | null> {
    return apiSecurePut<boolean | null>(`${process.env.API_URL}/client/update/${user.id}`, user)
}

export async function updatePhotoUserService(id: number, photo: File): Promise<boolean | null> {
    const formData = new FormData()
    formData.append("photo", photo)
    return await apiSecureMethodPostFile<boolean | null>(`/client/photo/${id}`, formData)
}

export async function getPhotoUserService(id: number,): Promise<string | null> {
    return await apiSecureGet<string | null>(`/client/photo/${id}`)
}

