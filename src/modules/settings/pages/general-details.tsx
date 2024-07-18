"use client";

import { Button } from "@/modules/common/components/button";
import { Input } from "@/modules/common/components/input";
import { SubmitButton } from "@/modules/common/components/submit-button";
import { ClientInfoRes } from "@/modules/dashboard/types";
import { useFormState } from "react-dom";
import { FiDelete, FiEdit, FiTrash, FiTrash2 } from "react-icons/fi";
import { updateUserForm } from "../services/actions";
import { useEffect } from "react";
import { toast } from "sonner";

export type GeneralDetailsProps = {
  clientInfo: ClientInfoRes;
};

export default function GeneralDetails(props: GeneralDetailsProps) {
  const [response, dispatch] = useFormState(updateUserForm, {
    message: null,
    errors: {},
  });

  const classNames = {
    label: "font-bold text-md",
    inputWrapper: "h-[49px]",
  };

  useEffect(() => {
    if (response.errors) {
      return;
    }

    toast.success(response?.message);
  }, [response]);

  const handleSubmit = (formData: FormData) => {
    formData.set("id", props.clientInfo.id.toString());
    dispatch(formData);
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

          <form
            action={handleSubmit}
            className="flex  flex-col gap-y-[20px] pt-1 flex-grow"
          >
            <Input
              classNames={classNames}
              name="givenName"
              label="Nombre"
              placeholder="Nombre"
              defaultValue={props.clientInfo.givenName}
              labelPlacement="outside"
            />

            <Input
              classNames={classNames}
              name="surname"
              label="Apellido"
              placeholder="Apellido"
              defaultValue={props.clientInfo.surname}
              labelPlacement="outside"
            />

            <Input
              classNames={classNames}
              name="email"
              label="Correo"
              placeholder="Correo"
              defaultValue={props.clientInfo.email}
              labelPlacement="outside"
            />
            <div className="flex flex-grow gap-5 justify-end">
              <Button className="rounded-xl bg-black hover:bg-gray-200 hover:text-black">
                Restablecer
              </Button>
              <SubmitButton className="rounded-xl bg-gray-200 text-black hover:bg-black hover:text-white">
                Actualizar
              </SubmitButton>
            </div>
          </form>
        </div>
        <div>
          <h1 className="text-xl pt-1">Biografia</h1>
          <hr className="w-full border-t" />
        </div>
        <div>Biografia ?</div>
      </div>
    </section>
  );
}
