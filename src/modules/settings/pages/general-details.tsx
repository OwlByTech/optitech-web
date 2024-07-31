"use client";

import { Button } from "@/modules/common/components/button";
import { Input } from "@/modules/common/components/input";
import { SubmitButton } from "@/modules/common/components/submit-button";
import { ClientInfoRes } from "@/modules/dashboard/types";
import { useFormState } from "react-dom";
import { updateUserForm } from "../services/actions";;
import { Asesor } from "@/modules/asesor/types";
import { Textarea } from "@/modules/common/components/text-area";
import PhotoUser from "../components/user-photo";
import { useFormResponse } from "@/modules/common/hooks/use-form-response";
import { useRouter } from "next/navigation";

export type GeneralDetailsProps = {
    clientInfo: ClientInfoRes;
    asesor?: Asesor
};

export default function GeneralDetails(props: GeneralDetailsProps) {
    const router = useRouter();
    const [response, dispatch] = useFormState(updateUserForm, {
        messages: [],
        errors: [],
    });

    useFormResponse({response, onEnd: () => {
       router.refresh();
    }});

    const handleSubmit = (formData: FormData) => {
        formData.set("id", props.clientInfo.id.toString());
        dispatch(formData);
    };

    return (
        <section className="flex flex-col">
            <form className="flex flex-col gap-4"
                action={handleSubmit}
            >
                <div className="flex flex-col gap-[10px]">
                    <h1 className="text-xl pt-1">Detalles generales</h1>
                    <hr className="w-full border-t" />
                </div>

                <div className="flex flex-col md:items-start md:flex-row md:flex-grow gap-x-[20px]">
                    <PhotoUser clientInfo={props.clientInfo} />
                    <div
                        className="flex  flex-col gap-y-[20px] pt-10 flex-grow"
                    >
                        <Input
                            name="givenName"
                            label="Nombre"
                            placeholder="Nombre"
                            defaultValue={props.clientInfo.givenName}
                        />

                        <Input
                            name="surname"
                            label="Apellido"
                            placeholder="Apellido"
                            defaultValue={props.clientInfo.surname}
                        />

                        <Input
                            name="email"
                            label="Correo"
                            placeholder="Correo"
                            defaultValue={props.clientInfo.email}
                        />

                    </div>
                </div>
                {props.clientInfo.asesor &&
                    <div className="flex flex-col gap-4">
                        <h1 className=" pb-2 w-full text-sm font-bold border-b">Descripcion personal</h1>
                        <Textarea
                            name="description"
                            placeholder="Escribe una descripción personal"
                            defaultValue={props.clientInfo.asesor.about}
                        />
                    </div>
                }
                <div className="flex flex-grow gap-5 justify-end">
                    <Button
                        type="reset"
                        className="rounded-lg bg-gray-200 text-black hover:bg-black hover:text-white"
                    >
                        Restablecer
                    </Button>
                    <SubmitButton
                        className="rounded-lg bg-black hover:bg-gray-200 hover:text-black"
                    >
                        Actualizar
                    </SubmitButton>
                </div>
            </form>
        </section>
    );
}
