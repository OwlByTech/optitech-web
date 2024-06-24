"use client";
import { usePathname } from "next/navigation";
import { RoutesSidebar } from "../components/routes-sidebar";
import { routesSidebarDown, routesSidebarUp } from "../types";

export function Routes() {
  const path = usePathname();

  console.log(path);
  return (
    <div className="h-full flex flex-col pt-14 justify-between">
      <RoutesSidebar routes={routesSidebarUp} path={path} />
      <RoutesSidebar routes={routesSidebarDown} path={path} />
    </div>
  );
}
