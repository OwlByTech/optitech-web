import { Button } from "@/modules/common/components/button";
import { SignOut } from "../sign-out";

export function Settings() {
  return (
    <section className="flex flex-col justify-between h-screen w-1/6 border rounded-3xl p-5">
      <div className="flex flex-col gap-5">
        <Button className="bg-white rounded-xl hover:bg-[#F3F3F3]">
          Detalles generales
        </Button>
        <Button className="bg-white rounded-xl hover:bg-[#F3F3F3]">
          Notificaciones
        </Button>
        <Button className="bg-white rounded-xl hover:bg-[#F3F3F3]">
          Seguridad
        </Button>
        <Button className="bg-white rounded-xl hover:bg-[#F3F3F3]">
          Integracion
        </Button>
      </div>
      <div>
        <SignOut className="w-full bg-white rounded-xl hover:bg-[#F3F3F3]" />
      </div>
    </section>
  );
}
