
import Link from "next/link";
import { ROUTES_SIDEBAR, Route } from "../../types";
import { ROLES } from "@/modules/auth/types";

type RoutesSidebarProps = {
    routes: Route[]
    path: string
    rol: ROLES
}

export function RoutesSidebar(props: RoutesSidebarProps) {
    const path = (routePath: string): Boolean => {

        if (props.path === routePath) return true

        const routePathSplit = routePath.split(ROUTES_SIDEBAR.DASHBOARD).join("")
        return Boolean(routePathSplit) && props.path.includes(routePathSplit)
    }
    return <div className="flex flex-col gap-2">
        {props.routes.map((route) => (
            <>
                {(route.role === 'all' || route.role === props.rol) &&
                    <Link href={route.route} className={`flex p-[10px] flex-row gap-x-4 ${path(route.route) && "bg-gray-100"} items-center rounded-md `} >
                        {route.icon}
                        <span className="text-sm">{route.name}</span>
                    </Link>
                }
            </>
        ))}
    </div>

}
