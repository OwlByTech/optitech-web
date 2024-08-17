import { version } from 'os';
import { z } from 'zod';
export enum ROUTES_ASESOR {
    REGISTER_ASESOR = '/register-asesor',
}
export type Asesor = {
    id: number;
    about?: string;
};

export type CreateAseorReq = {
    clientId: number;
    about?: string;
};

export type UpdateAseorReq = {
    about?: string;
};
export type Format = {
    name: string
    description: string
    extension: string
    version: string
    directoryId: number
    serviceId: number
    file: File
};

export const CreateAsesorReqValidator = z.object({
    about: z.string().optional(),
    clientId: z.number({ coerce: true }),
});

export const CreateFormatReqValidator = z.object({
    name: z.string(),
    description: z.string(),
    extension: z.string(),
    version: z.string(),
    directoryId: z.number({ coerce: true }),
    serviceId: z.number({ coerce: true }),
    file: z.any()
});


export type CreateFormatReq = {
    name: string,
    description: string
    extension: string
    version: string
    directoryId: number
    serviceId: number
    file: any
}
