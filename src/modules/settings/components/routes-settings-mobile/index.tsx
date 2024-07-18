"use client";
import Link from "next/link";
import { useState } from "react";
import { routesSettings } from "../../types";
import { usePathname } from "next/navigation";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

export function RoutesSettingsMobile() {
  const path = usePathname();
  const [startIndex, setStartIndex] = useState(0);
  const itemsPerPage = 1;

  const handleClickNext = () => {
    const newIndex = startIndex + itemsPerPage;
    setStartIndex(Math.min(newIndex, routesSettings.length - itemsPerPage));
  };

  const handleClickPrev = () => {
    const newIndex = startIndex - itemsPerPage;
    setStartIndex(Math.max(0, newIndex));
  };

  return (
    <div className="flex justify-center md:flex-col gap-2">
      <div className="flex flex-grow justify-between gap-2">
        <button
          onClick={handleClickPrev}
          className={`flex items-center px-2 py-1 ${
            startIndex === 0 ? "opacity-50 cursor-not-allowed" : ""
          }`}
          disabled={startIndex === 0}
        >
          <FiChevronLeft />
        </button>
        <div className="flex flex-col gap-2">
          {routesSettings
            .slice(startIndex, startIndex + itemsPerPage)
            .map((route, index) => (
              <Link
                key={index}
                href={route.route}
                className={`flex p-[10px] flex-row gap-x-4 ${
                  path === route.route && "bg-gray-100"
                } items-center rounded-md`}
              >
                <span className="text-sm">{route.name}</span>
              </Link>
            ))}
        </div>
        <button
          onClick={handleClickNext}
          className={`flex items-center px-2 py-1 ${
            startIndex + itemsPerPage >= routesSettings.length
              ? "opacity-50 cursor-not-allowed"
              : ""
          }`}
          disabled={startIndex + itemsPerPage >= routesSettings.length}
        >
          <FiChevronRight />
        </button>
      </div>
    </div>
  );
}
