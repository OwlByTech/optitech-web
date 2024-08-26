import {Asesor} from '@/modules/asesor/types';
import {ROLES, STATUS_CLIENT} from '@/modules/auth/types/enum';
import {ReactNode} from 'react';
import {FiBox, FiFile, FiHelpCircle, FiHome, FiMeh, FiSettings} from 'react-icons/fi';

export enum ROUTES_CONFIG {
  ACTIVATE_ACCOUNT = '/activate-account',
}
export enum ROUTES_SIDEBAR {
  DASHBOARD = '/dashboard',
  INSTITUTIONS = '/dashboard/institutions',
  INSTITUTION_INFO = '/dashboard/institution-info',
  SETTINGS = '/dashboard/settings',
  FILES = '/dashboard/files',
  ASESOR = '/dashboard/asesor',
}
export type Route = {
  route: string;
  name: string;
  icon: ReactNode;
  role: ROLES | 'all';
};

export const routesSidebarUp: Route[] = [
  {
    route: ROUTES_SIDEBAR.DASHBOARD,
    name: 'Inicio',
    icon: <FiHome />,
    role: 'all',
  },
  {
    route: ROUTES_SIDEBAR.ASESOR,
    name: 'Asesor',
    icon: <FiMeh />,
    role: ROLES.INSTITUTION,
  },
  {
    route: ROUTES_SIDEBAR.FILES,
    name: 'Archivos',
    icon: <FiFile />,
    role: ROLES.INSTITUTION,
  },
  {
    route: ROUTES_SIDEBAR.FILES,
    name: 'Formatos',
    icon: <FiFile />,
    role: ROLES.ASSESOR,
  },
  {
    route: ROUTES_SIDEBAR.INSTITUTION_INFO,
    name: 'Institucion',
    icon: <FiBox />,
    role: ROLES.INSTITUTION,
  },
  {
    route: ROUTES_SIDEBAR.INSTITUTIONS,
    name: 'Instituciones',
    icon: <FiFile />,
    role: ROLES.ASSESOR,
  },
];

export const routesSidebarDown: Route[] = [
  {
    route: ROUTES_SIDEBAR.SETTINGS,
    name: 'Configuracion',
    icon: <FiSettings />,
    role: 'all',
  },
];

export type ClientInfoRes = {
  id: number;
  name: string;
  givenName: string;
  photo?: string;
  surname: string;
  status: STATUS_CLIENT;
  email: string;
  roles: Role[];
  asesor?: Asesor;
};

export type Role = {
  id: number;
  roleName: ROLES;
  description: string;
};
