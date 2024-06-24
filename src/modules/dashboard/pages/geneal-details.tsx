import { Button } from "@/modules/common/components/button";
import { Input } from "@/modules/common/components/input";
import { clientInfoService } from "@/modules/dashboard/services";

export default async function GeneralDetails() {
  const clientInfo = await clientInfoService();
  return (
    <section className="flex flex-col">
      <div className="flex flex-col gap-[30px]">
        <div className="flex flex-col gap-[10px]">
          <h1 className="text-xl pt-1">Detalles generales</h1>
          <hr className="w-full border-t" />
        </div>

        <div className="flex flex-grow gap-x-[20px]">
          <div className="flex flex-col w-4/12 gap-y-[20px] px-[20px]">
            <h1 className="text-sm">Imagen de Perfil</h1>
            <div className="flex justify-center">
              <img className="h-52 w-52" src="/profile.png" alt="" />
            </div>
            <div className="flex flex-grow justify-between">
              <Button className="rounded-xl bg-gray-200 hover:bg-white hover:border hover:border-gray-300">
                Cambiar
              </Button>
              <Button className="rounded-xl bg-gray-200 hover:bg-white hover:border hover:border-gray-300">
                Borrar
              </Button>
            </div>
          </div>
          <div className="flex flex-col gap-y-[20px] w-8/12">
            <div className="flex flex-col gap-[10px]">
              <Input
                label="Nombre"
                placeholder="Nombre"
                defaultValue={clientInfo.givenName}
                labelPlacement="outside"
              />
            </div>
            <div className="flex flex-col gap-[10px]">
              <Input
                label="Apellido"
                placeholder="Apellido"
                defaultValue={clientInfo.surname}
                labelPlacement="outside"
              />
            </div>
            <div className="flex flex-col gap-[10px]">
              <Input
                label="Correo"
                placeholder="Correo"
                defaultValue={clientInfo.email}
                labelPlacement="outside"
              />
            </div>
          </div>
        </div>
        <div>
          <h1 className="text-xl pt-1">Detalles generales</h1>
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
