"use client"
import { Button } from "@/modules/common/components/button";
import { Input } from "@/modules/common/components/input";
import { useRouter } from "next/navigation";
import { useContext } from "react";
import { FiSquare } from "react-icons/fi";
import { InstitutionContext } from "../context";
import { SubmitButton } from "@/modules/common/components/submit-button";
import { AiOutlineForm } from "react-icons/ai";
import { ROUTES_INSTITUTION } from "../types";

export default function RegisterInstitution() {
    const route = useRouter()
    const { institution, setInstitution } = useContext(InstitutionContext)
    console.log(institution)
    return (
        <section className="flex flex-row h-screen w-screen">
            <div className="flex flex-col flex-grow gap-20 mx-10 my-24">
                <div className="flex flex-row gap-1 items-center">
                    <FiSquare className="h-7 w-7" />
                    <p>OptiTech</p>
                </div>

                <form className="flex flex-col gap-5" action={(form) => {
                    setInstitution({ name: form.get("name") as string, description: form.get("description") as string, logo: form.get("logo") as File })
                    route.push(ROUTES_INSTITUTION.REGISTER_INSTITUTION_SERVICES)
                }}>
                    <h1 className="text-4xl font-bold">Registrar Institucion</h1>
                    <Input
                        className=""
                        label="Nombre"
                        name="name"
                        required
                        placeholder="Nombre"
                        defaultValue={institution?.name}
                        labelPlacement="outside"
                    />

                    <Input
                        className=""
                        required
                        label="Descripción"
                        name="description"
                        defaultValue={institution?.description}
                        placeholder="DesDescripcióncripcion"
                        labelPlacement="outside"
                    />

                    <Input
                        type="file"
                        required
                        label="Logo"
                        name="logo"
                        placeholder="Logo"
                        labelPlacement="outside"
                    />

                    <SubmitButton className=" rounded-lg">
                        Siguiente
                    </SubmitButton>
                </form>
            </div>
            <div className="bg-gray-100 w-1/2"></div>
        </section>
    );
}
