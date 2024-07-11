export enum ROUTES_SETTINGS {
  GENERAL_DETAILS = "/dashboard/settings/general-details",
  INTEGRATIONS = "/dashboard/settings/integrations",
  NOTIFICATIONS = "/dashboard/settings/notifications",
  SECURITY = "/dashboard/settings/security",
}
export type route = {
  route: string;
  name: string;
};

export type User = {
  id?: number;
  token?: string;
  name?: string;
  surname?: string;
  email?: string;
};

export type StateUpdateUser = {
  errors?: {} | null;
  message?: string | null;
};

export const routesSettings = [
  {
    route: ROUTES_SETTINGS.GENERAL_DETAILS,
    name: "Detalles generales",
  },
  {
    route: ROUTES_SETTINGS.INTEGRATIONS,
    name: "Integraciones",
  },
  {
    route: ROUTES_SETTINGS.NOTIFICATIONS,
    name: "Notificaciones",
  },
  {
    route: ROUTES_SETTINGS.SECURITY,
    name: "Seguridad",
  },
];
