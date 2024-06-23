import { ReactNode } from 'react';
import { FiFile, FiHelpCircle, FiHome, FiMeh, FiSettings } from 'react-icons/fi';

export enum ROUTES_SIDEBAR {
    DASHBOARD = "/dashboard",
    SETTINGS = "/dashboard/settings",
    FILES = "/dashboard/files",
    ASESOR = "/dashboard/asesor",
    HELP = "/dashboard/help"
}
export type route = {
    route: string
    name: string
    icon: ReactNode
}



export const routesSidebarUp = [
    {
        route: ROUTES_SIDEBAR.DASHBOARD,
        name: "Inicio",
        icon: <FiHome />
    }
    , {
        route: ROUTES_SIDEBAR.ASESOR,
        name: "Asesor",
        icon: <FiMeh />
    },
    {
        route: ROUTES_SIDEBAR.FILES,
        name: "Archivos",
        icon: <FiFile />
    }
]

export const routesSidebarDown = [

    {
        route: ROUTES_SIDEBAR.SETTINGS,
        name: "Configuracion",
        icon: <FiSettings />
    }
    , {
        route: ROUTES_SIDEBAR.HELP,
        name: "Ayuda",
        icon: <FiHelpCircle />
    }
]

