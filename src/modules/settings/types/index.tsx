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
