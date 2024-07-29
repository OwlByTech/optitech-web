import { Institution, InstitutionRes } from "../types";
import { apiSecureGet, apiSecureMethodPostFile, apiSecurePost } from "@/modules/common/services";

export async function getServicesInstitution() {
    return await apiSecureGet(`/services`)
}

export async function getInstitutionService(): Promise<InstitutionRes | null> {
    return await apiSecureGet<InstitutionRes>(`/institution`)
}
export async function createInstitutionService(institution: Institution): Promise<Institution | null> {
    const data = await apiSecurePost<Institution | null>("/institution", institution)
    if (data?.id)
        await updateLogoInstitutionService(data?.id, institution.logo as File)
    return data
}
export async function updateLogoInstitutionService(id: number, logo: File): Promise<boolean | null> {
    const formData = new FormData()
    formData.append("logo", logo)
    return await apiSecureMethodPostFile(`/institution/logo/${id}`, formData)
}

export async function getLogoInstitutionService(id: number,): Promise<string | null> {
    return await apiSecureGet<string | null>(`/institution/logo/${id}`)
}

