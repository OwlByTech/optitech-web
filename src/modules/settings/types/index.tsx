import {ROUTES_SIDEBAR} from '@/modules/dashboard/types';
import {z} from 'zod';

export enum ROUTES_SETTINGS {
  INTEGRATIONS = '/dashboard/settings/integrations',
  NOTIFICATIONS = '/dashboard/settings/notifications',
  SECURITY = '/dashboard/settings/security',
}
export type route = {
  route: string;
  name: string;
};

export type UpdateClientInfoReq = {
  id: number;
  name?: string;
  surname?: string;
  email?: string;
};
export const UserInfo = z.object({
  id: z.number({coerce: true}),
  givenName: z.string(),
  surname: z.string(),
  email: z.string().email(),
});

export const UserPhoto = z.object({
  id: z.number({coerce: true}),
  photo: z.any(),
});

export const routesSettings = [
  {
    route: ROUTES_SIDEBAR.SETTINGS,
    name: 'Detalles generales',
  },
  {
    route: ROUTES_SETTINGS.INTEGRATIONS,
    name: 'Integraciones',
  },
  {
    route: ROUTES_SETTINGS.NOTIFICATIONS,
    name: 'Notificaciones',
  },
  {
    route: ROUTES_SETTINGS.SECURITY,
    name: 'Seguridad',
  },
];

export type UpdateUserPhotoReq = {
  id: number;
  photo: File;
};
export type UpdateUpserPhotoRes = {};
