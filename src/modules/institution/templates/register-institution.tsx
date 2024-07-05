"use client"
import { Input } from "@/modules/common/components/input";
import { useRouter } from "next/navigation";
import { ROUTES_INSTITUTION } from "../types";
import { Textarea } from "@/modules/common/components/text-area";
import { useAtom } from "jotai";
import { institutionStorage } from "../context";
import { ContainerRegister } from "../components/container-register";

export default function RegisterInstitution() {
    const route = useRouter()
    const [institution, setInstitution] = useAtom(institutionStorage)
    return (
        <>
            <ContainerRegister
                title="Registrar institución"
                buttonName="Siguiente"
                action={async (form) => {
                    setInstitution({ ...institution, name: form.get("name") as string, description: form.get("description") as string })
                    route.push(ROUTES_INSTITUTION.REGISTER_INSTITUTION_SERVICES)
                }}>
                <Input
                    label="Nombre"
                    name="name"
                    required
                    placeholder="Nombre"
                    defaultValue={institution?.name}
                    labelPlacement="outside"
                />

                <Textarea
                    required
                    label="Descripción"
                    name="description"
                    defaultValue={institution?.description}
                    placeholder="Escribe una descripción"
                    labelPlacement="outside"
                />

            </ContainerRegister >
            <div className="bg-gray-100 hidden md:block md:w-1/2"></div>
        </>
    );
}
