"use client";
import { usePathname } from "next/navigation";
import { RoutesSidebar } from "../components/routes-sidebar";
import { routesSidebarDown, routesSidebarUp } from "../types";
import { FiArrowLeft } from "react-icons/fi";

interface RoutesProps {
  closeRoutes?: () => void;
}

export function Routes({ closeRoutes }: RoutesProps) {
  const path = usePathname();

  return (
    <div className="h-full flex flex-col pb-16 pt-10 md:pt-14 justify-between">
      <div
        className="flex flex-row items-center cursor-pointer gap-3 px-2"
        onClick={closeRoutes}
      >
        <FiArrowLeft className="md:hidden w-6 h-6 cursor-pointer" />
        <p className="text-sm">Atras</p>
      </div>
      <div>
        <RoutesSidebar routes={routesSidebarUp} path={path} />
        <RoutesSidebar routes={routesSidebarDown} path={path} />
      </div>
    </div>
  );
}
