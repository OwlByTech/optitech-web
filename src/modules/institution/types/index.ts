import {ClientInfoRes} from '@/modules/dashboard/types';
import {z} from 'zod';

export type Institution = {
  id?: number;
  name?: string;
  description?: string;
  logo?: File;
  services?: number[];
  clients?: number[];
};

export type InstitutionRes = {
  id: number;
  institutionName: string;
  description: string;
  logo: string;
  services: Service[];
  clients: ClientInfoRes[];
  asesorId: number;
};

export type Service = {
  id?: number;
  name?: string;
};
export type InstitutionContextType = {
  institution: Institution | null;
  setInstitution: (instituton: Institution) => void;
};

export const CreateInstitution = z.object({
  name: z.string(),
  description: z.string(),
  services: z.number().array().min(1),
});
export const InstitutionLogo = z.object({
  id: z.number({coerce: true}),
  logo: z.any(),
});
export enum ROUTES_INSTITUTION {
  REGISTER_INSTITUTION = '/register-institution',
  REGISTER_INSTITUTION_SERVICES = '/register-institution/services',
  REGISTER_INSTITUTION_LOGO = '/register-institution/logo',
  INSTITUTION_GENERAL = '/dashboard/institution-info',
  INSTITUTION_SERVICES = '/dashboard/institution-info/services',
  INSTITUTION_USERS = '/dashboard/institution-info/users',
}
