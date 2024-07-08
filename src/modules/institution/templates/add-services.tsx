"use client"
import { ROUTES_INSTITUTION, Service } from "../types";
import Services from "../components/services-institution";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useAtom } from "jotai";
import { institutionStorage } from "../context";
import { ContainerRegister } from "../components/container-register";
import { ImageSection } from "@/modules/common/layouts/image-section";

export default function AddServices({ servicesData }: { servicesData: Service[] }) {
    const router = useRouter()
    const [institution, setInstitution] = useAtom(institutionStorage)
    if (!institution?.name || !institution?.description) {
        router.replace(ROUTES_INSTITUTION.REGISTER_INSTITUTION)
    }

    return (
        <ImageSection src="https://www.clinicaazul.com.co/wp-content/uploads/2020/05/noticia2.jpg">
            <ContainerRegister
                href={ROUTES_INSTITUTION.REGISTER_INSTITUTION}
                title="Servicios"
                subtitle="Selecciona los servicos ofertados"
                action={async () => {
                    if (!institution.services || institution.services?.length === 0) {
                        toast.error("Selecciona al menos un servicio")
                    } else {
                        router.push(ROUTES_INSTITUTION.REGISTER_INSTITUTION_LOGO)
                    }

                }}
                buttonName="Siguiente"
            >
                <Services servicesData={servicesData} institution={institution} setInstitution={setInstitution} />
            </ContainerRegister >
            <div className="bg-gray-100 hidden md:block md:w-1/2"></div>
        </ImageSection>
    );

}
