import { z } from "zod";
export enum ROUTES_ASESOR {
  REGISTER_ASESOR = "/register-asesor",
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

export const CreateAsesorReqValidator = z.object({
  about: z.string().optional(),
  clientId: z.number({coerce: true}),
});
