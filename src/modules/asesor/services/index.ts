import { apiSecureGet, apiSecurePost } from "@/modules/common/services";
import { Asesor, CreateAseorReq } from "../types";
import { clientInfoService } from "@/modules/dashboard/services";

export async function createAsesorService(createAsesor: CreateAseorReq): Promise<Asesor | null> {
    return await apiSecurePost<Asesor>(
        "/asesor",
        createAsesor
    );
}


export async function getAsesorService(id: number): Promise<Asesor | null> {
    return await apiSecureGet<Asesor>(
        `/asesor/${id}`
    );
}
