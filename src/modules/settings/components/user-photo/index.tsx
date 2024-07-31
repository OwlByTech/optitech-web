"use client";

import { ClientInfoRes } from "@/modules/dashboard/types";
import { useFormState } from "react-dom";
import { updateUserPhoto } from "../../services/actions";
import ProfileImage from "@/modules/common/components/profile-image";
import { useRouter } from "next/navigation";
import { useFormResponse } from "@/modules/common/hooks/use-form-response";

export type ProfileImageProps = {
    clientInfo: ClientInfoRes;
};

export default function PhotoUser(props: ProfileImageProps) {
    const router = useRouter()
    const [response, dispatch] = useFormState(updateUserPhoto, {
        messages: [],
        errors: [],
    });

    useFormResponse({response, onSuccess: () => {
        router.refresh();
    }});

    const handleSubmit = (file: File) => {
        const formData = new FormData()
        formData.set("id", props.clientInfo.id.toString());
        formData.set("photo", file)
        dispatch(formData);
    };

    return (
        <ProfileImage src={props.clientInfo.photo} handleSubmit={handleSubmit} />
    );
}
