import { useEffect, useState } from "react";

export function TimeTopBar() {
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
    };

    return date.toLocaleDateString("es-ES", options).toUpperCase();
  };

  return (
    <time
      dateTime={currentTime.toISOString()}
      suppressHydrationWarning
      className="hidden md:block text-xs"
    >
      {formatTime(currentTime)}
    </time>
  );
}
