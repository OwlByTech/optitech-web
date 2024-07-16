"use client";
import { useState } from "react";
import { FiArrowLeft } from "react-icons/fi";
import { usePathname } from "next/navigation";
import { routesSidebarDown, routesSidebarUp } from "../types";
import { RoutesSidebar } from "../components/routes-sidebar";

interface RoutesProps {
  closeRoutes?: () => void;
}

export function Routes({ closeRoutes }: RoutesProps) {
  const path = usePathname();
  const [showSettings, setShowSettings] = useState(false);

  const toggleSettings = () => {
    setShowSettings(!showSettings);
  };

  return (
    <div className="h-full flex flex-col pb-16 pt-10 md:pt-14 justify-between">
      <div
        className="flex flex-row items-center cursor-pointer gap-3 px-2 md:hidden"
        onClick={closeRoutes}
      >
        <FiArrowLeft className="w-6 h-6 cursor-pointer" />
        <p className="text-sm">Atrás</p>
      </div>

      <div className="md:flex md:flex-col md:flex-grow md:justify-between">
        <RoutesSidebar routes={routesSidebarUp} path={path} />
        <RoutesSidebar routes={routesSidebarDown} path={path} />
      </div>
    </div>
  );
}
