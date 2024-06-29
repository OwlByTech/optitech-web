"use client"
import { Button } from "@/modules/common/components/button";
import Link from "next/link";
import { FiArrowLeftCircle, FiSquare } from "react-icons/fi";
import { ROUTES_INSTITUTION } from "../types";
import Services from "../components/services-institution";
import { useState } from "react";

export default function AddServices({ servicesData }: { servicesData: any }) {
    const [services, setServices] = useState([])
    return (
        <section className="flex flex-row justify-between h-screen w-screen">
            <div className="flex flex-col flex-grow mx-10 gap-4 my-20 w-1/2">
                <div className="flex items-end justify-start w-full text-sm gap-x-5 ">
                    <Link href={ROUTES_INSTITUTION.REGISTER_INSTITUTION_INFORMATION}>
                        <FiArrowLeftCircle className="h-7 w-7" />
                    </Link>
                    <h1 className="text-sm">Anterior</h1>
                </div>

                <div className="flex flex-col gap-5">
                    <h1 className="text-4xl font-bold">Añadir Servicios</h1>
                    <Services servicesData={servicesData} services={services} setServices={setServices} />
                    <Button className="rounded-lg bg-black text-white font-bold border hover:bg-white hover:text-black border-black">
                        Crear
                    </Button>

                </div>
                <p className="flex flex-row gap-1 text-xs">
                    Al registrarte, aceptas los{" "}
                    <Link href="">
                        <p className="text-blue-500">Términos de Servicio</p>
                    </Link>{" "}
                    y la{" "}
                    <Link href="">
                        <p className="text-blue-500">Política de Privacidad</p>
                    </Link>
                </p>
            </div>
            <div className="bg-gray-100 w-1/2"></div>
        </section>
    );
}
