"use client";
import Link from "next/link";
import { useState } from "react";
import { routesSettings } from "../../types";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

export function RoutesSettingsMobile() {
    const [index, setIndex] = useState(0);

    const handleClickNext = () => {
        setIndex(index + 1);
    };

    const handleClickPrev = () => {
        setIndex(index - 1);
    };

    return (
        <>
            {index !== 0 ?
                <Link
                    href={routesSettings[index - 1].route}
                    onClick={handleClickPrev}
                >
                    <FiChevronLeft className="h-6 w-6" />
                </Link>
                :
                <FiChevronLeft className="cursor-not-allowed w-6 h-6" />
            }
            <span className="text-sm">{routesSettings[index].name}</span>

            {index < routesSettings.length - 1 ?
                <Link
                    href={routesSettings[index + 1].route}
                    onClick={handleClickNext}
                >
                    <FiChevronRight className="w-6 h-6" />
                </Link>
                :
                <FiChevronRight className="cursor-not-allowed w-6 h-6" />
            }
        </>
    );
}
