import { apiSecureGet, apiSecureMethodPostFile, apiSecurePost } from '@/modules/common/services';
import { Asesor, CreateAllFormatReq, CreateAllFormatRes, CreateAseorReq, CreateFormatReq } from '../types';
import { CommonServiceRes } from '@/modules/common/types';

export async function createAsesorService(
    createAsesor: CreateAseorReq
): Promise<CommonServiceRes<Asesor | null>> {
    try {
        const data = await apiSecurePost<Asesor>('/asesor', createAsesor);
        if (!data) {
            return { errors: [['No se ha registrado los datos.']] };
        }
        return {
            data,
            messages: ['Bienvenido'],
        };
    } catch (e) {
        const error = e as Error;
        return {
            errors: [[error.message]],
        };
    }
}

export async function getAsesorService(id: number): Promise<CommonServiceRes<Asesor | null>> {
    try {
        const data = await apiSecureGet<Asesor>(`/asesor/${id}`);
        if (!data) {
            return { errors: [['No se encuentra asesor.']] };
        }
        return {
            data,

        };
    } catch (e) {
        const error = e as Error;
        return {
            errors: [[error.message]],
        };
    }
}

export async function getFormatService(id: number) {



}


export async function createFormatService(req: CreateFormatReq): Promise<CommonServiceRes<any | null>> {
    const dataCreate = new FormData();
    dataCreate.set('data', JSON.stringify(
        {
            directoryId: req.directoryId,
            name: req.name,
            description: req.description,
            extension: req.extension,
            version: req.version,
            serviceId: req.serviceId
        }));

    dataCreate.set('file', req.file);

    try {
        const data = await apiSecureMethodPostFile<any>('/format', dataCreate);

        if (!data) {
            return { errors: [['No se creo el formato.']] };
        }
        return {
            data: data,
            messages: ["Formato ha sido creado"]
        }

    } catch (e) {
        const error = e as Error;
        return {
            errors: [[error.message]],
        };
    }
}


