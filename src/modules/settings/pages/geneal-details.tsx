import { Button } from "@/modules/common/components/button";
import { Input } from "@/modules/common/components/input";
import { clientInfoService } from "@/modules/dashboard/services";
import { input } from "@nextui-org/react";
import { FiDelete, FiEdit, FiTrash, FiTrash2 } from "react-icons/fi";

export default async function GeneralDetails() {
  const clientInfo = await clientInfoService();
  const classNames = {
    label: "font-bold text-md",
    inputWrapper: "h-[49px]",
  };
  return (
    <section className="flex flex-col">
      <div className="flex flex-col gap-[30px]">
        <div className="flex flex-col gap-[10px]">
          <h1 className="text-xl pt-1">Detalles generales</h1>
          <hr className="w-full border-t" />
        </div>

        <div className="flex flex-grow gap-x-[20px]">
          <div className="flex flex-col w-[250px] gap-y-[20px] pt-1: ">
            <h1 className="font-bold text-md">Imagen de Perfil</h1>
            <img className="h-[250px] w-[250px]" src="/profile.png" />
            <div className="flex flex-grow justify-between">
              <Button
                startContent={<FiEdit />}
                className="rounded-xl bg-gray-200 hover:bg-white hover:border hover:border-gray-300"
              >
                Cambiar
              </Button>
              <Button
                startContent={<FiTrash2 />}
                className="rounded-xl bg-gray-200 hover:bg-white hover:border hover:border-gray-300"
              >
                Borrar
              </Button>
            </div>
          </div>
          <form className="flex  flex-col gap-y-[20px] pt-1 flex-grow">
            <Input
              classNames={classNames}
              label="Nombre"
              placeholder="Nombre"
              defaultValue={clientInfo.givenName}
              labelPlacement="outside"
            />

            <Input
              classNames={classNames}
              label="Apellido"
              placeholder="Apellido"
              defaultValue={clientInfo.surname}
              labelPlacement="outside"
            />

            <Input
              label="Correo"
              placeholder="Correo"
              classNames={classNames}
              defaultValue={clientInfo.email}
              labelPlacement="outside"
            />
          </form>
        </div>
        <div>
          <h1 className="text-xl pt-1">Biografia</h1>
          <hr className="w-full border-t" />
        </div>
        <div>Biografia ?</div>
      </div>
      <div className="flex flex-grow gap-5 justify-end">
        <Button className="rounded-xl bg-white hover:bg-gray-200">
          Restablecer
        </Button>
        <Button className="rounded-xl bg-gray-200 hover:bg-white">
          Actualizar
        </Button>
      </div>
    </section>
  );
}
