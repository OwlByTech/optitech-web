"use client"
import { UploadFile } from "@/modules/common/components/upload-file";
import { useAtom } from "jotai";
import { useRouter } from "next/navigation";
import { institutionStorage } from "../context";
import { ROUTES_INSTITUTION } from "../types";
import { createInstitution } from "../services/actions";
import { useEffect, useState } from "react";
import { useFormState } from "react-dom";
import { toast } from "sonner";
import { ContainerRegister } from "../components/container-register";
import { ROUTES_SIDEBAR } from "@/modules/dashboard/types/types";
import { ImageSection } from "@/modules/common/layouts/image-section";

export default function AddLogo() {
    const router = useRouter()
    const [institution] = useAtom(institutionStorage)
    if (!institution?.name || !institution?.description) {
        router.replace(ROUTES_INSTITUTION.REGISTER_INSTITUTION)
    }
    if (!institution?.services) {
        router.replace(ROUTES_INSTITUTION.REGISTER_INSTITUTION_SERVICES)
    }
    const institutionAction = createInstitution.bind(null, institution?.name, institution?.description, institution?.services)
    const [response, dispatch] = useFormState(institutionAction, { errors: {}, message: null });
    const [selectedFiles, setSelectedFiles] = useState([]);
    useEffect(() => {
        if (!response?.errors) {
            setSelectedFiles([])
            toast.success(response?.message)
            router.replace(ROUTES_SIDEBAR.DASHBOARD)
        }
        if (response.errors?.api) {
            toast.error(response.errors?.api)
        }
    }, [response])
    return (
        <ImageSection src="https://www.clinicaazul.com.co/wp-content/uploads/2020/05/noticia2.jpg">
            <ContainerRegister href={ROUTES_INSTITUTION.REGISTER_INSTITUTION_SERVICES}
                title="Logo" subtitle="Elige un logo para la institución"
                action={dispatch}
                buttonName="Crear"
            >
                <UploadFile
                    name="logo"
                    required preview
                    acceptedFileExtensions={["jpg", "png", "jpeg"]}
                    setSelectedFiles={setSelectedFiles}
                    selectedFiles={selectedFiles} />
            </ContainerRegister>
        </ImageSection>
    );


}
