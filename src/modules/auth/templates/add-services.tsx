import { Button } from "@/modules/common/components/button";
import { Input } from "@/modules/common/components/input";
import Link from "next/link";
import { FiSquare } from "react-icons/fi";

export default function AddServices() {
  return (
    <section className="flex flex-row justify-between h-screen w-screen">
      <div className="flex flex-col flex-grow justify-between mx-10 my-24">
        <div className="flex flex-row gap-1 items-center">
          <FiSquare className="h-7 w-7" />
          <p>OptiTech</p>
        </div>

        <div className="flex flex-col gap-5">
          <h1 className="text-4xl font-bold">Añadir Servicios</h1>

          <div className="h-60 border border-gray-500"></div>

          <Button className="rounded-lg bg-white text-black font-bold border hover:bg-black hover:text-white border-black">
            Agregar
          </Button>
          <Button className="rounded-lg bg-black text-white font-bold border hover:bg-white hover:text-black border-black">
            Crear
          </Button>

          <p className="flex flex-row gap-1">
            Al registrarte, aceptas los{" "}
            <Link href="">
              <p className="text-blue-500">Términos de Servicio</p>
            </Link>{" "}
            y la{" "}
            <Link href="">
              <p className="text-blue-500">Política de Privacidad</p>
            </Link>
          </p>
        </div>
      </div>
      <div className="bg-gray-100 w-1/2"></div>
    </section>
  );
}
