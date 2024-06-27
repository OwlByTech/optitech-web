
import Link from "next/link";
import { route } from "../../types";

type Props = {
    routes: route[]
    path: string
}

export function RoutesSidebar({ routes, path }: Props) {
    return <div className="flex flex-col gap-2">
        {routes.map((route) => (
            <Link href={route.route} className={`flex p-[10px] flex-row gap-x-4 ${path === route.route && "bg-gray-100"} items-center rounded-md `} >
                {route.icon}
                <span className="text-sm">{route.name}</span>
            </Link>
        ))}
    </div>

}
