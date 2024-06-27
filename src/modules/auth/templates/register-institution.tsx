import { Button } from "@/modules/common/components/button";
import { Input } from "@/modules/common/components/input";
import { FiSquare } from "react-icons/fi";

export default function RegisterInstitution() {
  return (
    <section className="flex flex-row justify-between h-screen w-screen">
      <div className="flex flex-col flex-grow justify-center mx-10 gap-5">
        <div className="flex flex-row gap-1 items-center">
          <FiSquare className="h-7 w-7" />
          <p>OptiTech</p>
        </div>

        <div className="flex flex-col gap-5">
          <h1 className="text-4xl font-bold">Registrar Institucion</h1>
          <Input
            className=""
            label="Nombre"
            placeholder="Nombre"
            labelPlacement="outside"
          />

          <Input
            className=""
            label="Descripción"
            placeholder="DesDescripcióncripcion"
            labelPlacement="outside"
          />

          <Input
            type="file"
            className=""
            label="Logo"
            placeholder="Logo"
            labelPlacement="outside"
          />

          <Button className="rounded-lg bg-black text-white font-bold border hover:bg-white hover:text-black hover:border-black">
            Siguiente
          </Button>
        </div>
      </div>
      <div className="bg-gray-100 w-1/2"></div>
    </section>
  );
}
