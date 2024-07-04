"use client";
import { useEffect, useState } from "react";
import { Button } from "@/modules/common/components/button";
import { FiInfo, FiMenu, FiPauseCircle } from "react-icons/fi";

export function TopBar() {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (date: Date): string => {
    const options: Intl.DateTimeFormatOptions = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    };

    return date.toLocaleDateString("es-ES", options);
  };

  return (
    <div className="flex h-20 flex-row p-5 md:bg-transparent bg-white items-center justify-between w-screen md:w-full gap-4">
      <time
        dateTime={currentTime.toISOString()}
        className="hidden md:block text-xs"
      >
        {formatTime(currentTime)}
      </time>
      <FiMenu className="w-6 h-6 md:hidden cursor-pointer" />

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
          src="/profile.png"
        />
      </div>
    </div>
  );
}
