"use client";

import { useFormState } from "react-dom";
import { useEffect } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { InstitutionRes } from "../../types";
import ProfileImage from "@/modules/common/components/profile-image";
import { updateLogoInstitution } from "../../services/actions";

export type LogoProps = {
    institution: InstitutionRes;
};

export default function LogoInstitution(props: LogoProps) {
    const [response, dispatch] = useFormState(updateLogoInstitution, {
        message: null,
        errors: {},
    });
    const router = useRouter()
    useEffect(() => {
        if (response.errors) {
            return;
        }

        toast.success(response?.message);
        router.refresh()
    }, [response]);

    const handleSubmit = (file: File) => {
        const formData = new FormData()
        formData.set("id", props.institution.id.toString());
        formData.set("photo", file)
        dispatch(formData);
    };

    return (
        <ProfileImage src={props.institution.logo} handleSubmit={handleSubmit} />
    );
}
