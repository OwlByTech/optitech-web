"use client";
import { useState } from "react";
import { FiArrowLeft } from "react-icons/fi";
import { usePathname } from "next/navigation";
import { ClientInfoRes, routesSidebarDown, routesSidebarUp } from "../types";
import { RoutesSidebar } from "../components/routes-sidebar";


type SideBarRoutesProps = {
    clientInfo: ClientInfoRes
}

export function Routes(props: SideBarRoutesProps) {
    const path = usePathname();

    return (
        <div className="h-full flex flex-col pb-16 pt-10 md:pt-14 justify-between">
            <div className="md:flex md:flex-col md:flex-grow md:justify-between">
                <RoutesSidebar rol={props.clientInfo.roles[0].roleName} routes={routesSidebarUp} path={path} />
                <RoutesSidebar rol={props.clientInfo.roles[0].roleName} routes={routesSidebarDown} path={path} />
            </div>
        </div>
    );
}
