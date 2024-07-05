"use client"
import { LinkRef } from "@/modules/common/components/link-ref";
import { SubmitButton } from "@/modules/common/components/submit-button";
import { UploadFile } from "@/modules/common/components/upload-file";
import { useAtom } from "jotai";
import { useRouter } from "next/navigation";
import { institutionStorage } from "../context";
import { ROUTES_INSTITUTION } from "../types";
import { createInstitution } from "../services/actions";
import { useEffect } from "react";
import { useFormState } from "react-dom";
import { toast } from "sonner";
import { ContainerRegister } from "../components/container-register";
import { ROUTES_SIDEBAR } from "@/modules/dashboard/types/types";

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
    useEffect(() => {
        if (!response?.errors) {
            toast.success(response?.message)
            router.replace(ROUTES_SIDEBAR.DASHBOARD)
        }
        if (response.errors?.api) {
            toast.error(response.errors?.api)
        }
    }, [response])
    return (
        <>
            <ContainerRegister href={ROUTES_INSTITUTION.REGISTER_INSTITUTION}
                title="Logo" subtitle="Elige un logo para la institución"
                action={dispatch}
                buttonName="Crear"
            >
                <UploadFile name="logo" required preview />

            </ContainerRegister>
            <div className="bg-gray-100 hidden md:block md:w-1/2"></div>
        </>
    );


}
