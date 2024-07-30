"use client";
import { useState, useEffect, useRef } from "react";
import { Button } from "@/modules/common/components/button";
import { FiArrowLeft, FiInfo, FiMenu, FiPauseCircle } from "react-icons/fi";
import { TimeTopBar } from "../components/time-top-bar";
import { Routes } from "./routes";
import { ClientInfoRes } from "../types";
import ClickOutside from "@/modules/common/components/click-outside";
type TopBarProps = {
    clientInfo: ClientInfoRes
}
export function TopBar(props: TopBarProps) {
    const [isRoutesVisible, setIsRoutesVisible] = useState(false);
    const routesRef = useRef(null);

    const toggleRoutes = () => {
        setIsRoutesVisible(!isRoutesVisible);
    };


    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (routesRef.current && event.target instanceof Node) {
                if (!routesRef.current.contains(event.target as Node)) {
                    setIsRoutesVisible(false);
                }
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [routesRef]);

    return (
        <div className="flex h-20 flex-row p-5 md:bg-transparent bg-white items-center justify-between w-screen md:w-full gap-4">
            <TimeTopBar />
            <FiMenu
                className="w-6 h-6 md:hidden cursor-pointer"
                onClick={toggleRoutes}
            />

            <div className="flex flex-row w-auto md:gap-2 ">
                <Button
                    className="bg-white md:bg-gray-200 text-xs text-black h-10 md:w-32"
                    isIconOnly
                    radius="md"
                    size="md"
                    startContent={<FiPauseCircle className="md:h-5 md:w-5 w-6 h-6" />}
                >
                    <span className="md:pl-2 hidden md:block">Pendientes</span>
                </Button>
                <Button
                    className="bg-white md:bg-gray-200 text-xs text-black h-10 md:w-32"
                    isIconOnly
                    radius="md"
                    size="md"
                    startContent={<FiInfo className="md:h-5 md:w-5 w-6 h-6" />}
                >
                    <span className="md:pl-2 hidden md:block">Notificaciones</span>
                </Button>
                <img
                    className="md:hidden bg-white md:bg-gray-200 text-xs text-black h-10 w-10 md:w-32"
                    src={props.clientInfo.photo !== "" ? props.clientInfo.photo : "/profile.png"}
                />
            </div>
            {isRoutesVisible && (
                <ClickOutside
                    className="fixed top-0 shadow-md left-0 w-[280px] h-full bg-white z-50"
                    onClick={toggleRoutes}
                >
                    <div className=" flex flex-col gap-4 h-full w-full py-8 px-2">
                        <div
                            className="flex flex-row items-center cursor-pointer gap-3 px-2 md:hidden"
                            onClick={toggleRoutes}
                        >
                            <FiArrowLeft className="w-6 h-6 cursor-pointer" />
                            <p className="text-sm">Atrás</p>
                        </div>


                        <Routes clientInfo={props.clientInfo} />

                    </div>
                </ClickOutside>
            )}
        </div>
    );
}
