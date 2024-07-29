"use client";

import { Button } from "@/modules/common/components/button";
import { ClientInfoRes } from "@/modules/dashboard/types";
import { useFormState } from "react-dom";
import { useEffect } from "react";
import { toast } from "sonner";
import { updateUserPhoto } from "../../services/actions";
import ProfileImage from "@/modules/common/components/profile-image";
import { useRouter } from "next/navigation";

export type ProfileImageProps = {
    clientInfo: ClientInfoRes;
};

export default function PhotoUser(props: ProfileImageProps) {
    const [response, dispatch] = useFormState(updateUserPhoto, {
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
        formData.set("id", props.clientInfo.id.toString());
        formData.set("photo", file)
        dispatch(formData);
    };

    return (
        <ProfileImage src={props.clientInfo.photo} handleSubmit={handleSubmit} />
    );
}
