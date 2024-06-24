"use client";
import { useState } from "react";
import GeneralDetails from "../../pages/geneal-details";
import Notifications from "../../pages/notifications";
import Security from "../../pages/security";
import Integrations from "../../pages/integrations";
import { SignOut } from "@/modules/auth/components/sign-out";

type SelectOption =
  | "Detalles Generales"
  | "Notificaciones"
  | "Seguridad"
  | "Integraciones";

export function Settings() {
  const [selectOption, setSelectOption] =
    useState<SelectOption>("Detalles Generales");

  const renderContent = () => {
    switch (selectOption) {
      case "Detalles Generales":
        return <GeneralDetails />;
      case "Notificaciones":
        return <Notifications />;
      case "Seguridad":
        return <Security />;
      case "Integraciones":
        return <Integrations />;
    }
  };

  return (
    <section className="flex flex-grow gap-4 h-full rounded-3xl">
      <div className="flex flex-col justify-between bg-white h-full w-3/12 border rounded-3xl p-5">
        <div className="flex flex-col gap-2">
          <button
            className="text-left text-sm p-2 hover:bg-gray-100 hover:rounded-xl"
            onClick={() => setSelectOption("Detalles Generales")}
          >
            Detalles Generales
          </button>
          <button
            className="text-left text-sm p-2 hover:bg-gray-100 hover:rounded-xl"
            onClick={() => setSelectOption("Notificaciones")}
          >
            Notificaciones
          </button>
          <button
            className="text-left text-sm p-2 hover:bg-gray-100 hover:rounded-xl"
            onClick={() => setSelectOption("Seguridad")}
          >
            Seguridad
          </button>
          <button
            className="text-left text-sm p-2 hover:bg-gray-100 hover:rounded-xl"
            onClick={() => setSelectOption("Integraciones")}
          >
            Integraciones
          </button>
        </div>
        <div>
          <SignOut />
        </div>
      </div>
      <div className="flex flex-col justify-between bg-white h-full w-9/12 border rounded-3xl p-5">
        {renderContent()}
      </div>
    </section>
  );
}
