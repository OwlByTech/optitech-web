"use client"
import { Input } from "@/modules/common/components/input";
import { useRouter } from "next/navigation";
import { ROUTES_INSTITUTION } from "../types";
import { Textarea } from "@/modules/common/components/text-area";
import { useAtom } from "jotai";
import { institutionStorage } from "../context";
import { ContainerRegister } from "@/modules/common/components/container-register";
import { ImageSection } from "@/modules/common/layouts/image-section";

export default function RegisterInstitution() {
    const route = useRouter()
    const [institution, setInstitution] = useAtom(institutionStorage)
    return (
        <ImageSection src="https://www.clinicaazul.com.co/wp-content/uploads/2020/05/noticia2.jpg">
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
                />

                <Textarea
                    required
                    label="Descripción"
                    name="description"
                    defaultValue={institution?.description}
                    placeholder="Escribe una descripción"
                />

            </ContainerRegister >
        </ImageSection>
    );
}
