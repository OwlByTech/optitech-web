"use client";

<<<<<<< HEAD
import { Input } from "@nextui-org/react";
import { useAtom } from "jotai";
import { formDataAtom } from "../../../context/atom";
import { useRouter } from "next/navigation";
import { SubmitButton } from "@/modules/common/components/submit-button";
import { ChangeEvent, FormEvent } from "react";

export default function Step1() {
    const [formData, setFormData] = useAtom(formDataAtom);
    const router = useRouter();

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        router.push("/sign-up/step-two");
    };
=======
import { Input, Link } from "@nextui-org/react";
import { usePathname } from "next/navigation";
import { useFormState } from "react-dom";
import { authenticate } from "../services/actions";
import { SubmitButton } from "@/modules/common/components/submit-button";

export default function Step1() {
    const [errorMessage, dispatch] = useFormState(authenticate, undefined);
    const pathname = usePathname();
>>>>>>> 9b106a7 (feat: templates for steps)

    return (
        <section className="flex flex-col border justify-center items-center w-full sm:w-1/2 h-screen gap-5 p-4 sm:p-0">
            <span className="font-bold items-left text-3xl m-6">Paso 1: Información Personal</span>
            <div className="flex flex-col m-6 w-full sm:w-auto">
                <span className="text-lg">Tus datos están seguros con nosotros</span>
                <div className="flex items-center">
<<<<<<< HEAD
                    <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full sm:min-w-80">
=======
                    <form action={dispatch} className="flex flex-col gap-4 w-full sm:min-w-80">
>>>>>>> 9b106a7 (feat: templates for steps)
                        <label htmlFor="giveName">Nombres</label>
                        <Input
                            label="Escribe tu nombre"
                            name="giveName"
                            required
                            type="text"
                            radius="sm"
                            variant="bordered"
<<<<<<< HEAD
                            value={formData.giveName}
                            onChange={handleChange}
=======
>>>>>>> 9b106a7 (feat: templates for steps)
                        />
                        <label htmlFor="surName">Apellidos</label>
                        <Input
                            label="Escribe tu apellido"
                            name="surName"
                            required
                            type="text"
                            radius="sm"
                            variant="bordered"
<<<<<<< HEAD
                            value={formData.surName}
                            onChange={handleChange}
                        />
                        <SubmitButton className="rounded-lg gap-1">
                            <span className="text-xs text-white font-bold">Siguiente</span>
=======
                        />
                        {errorMessage && (
                            <p className="text-red-600 font-bold text-xs">{errorMessage}</p>
                        )}
                        <SubmitButton className="rounded-lg gap-1">
                            <Link href="/signUp/stepTwo" className="text-xs text-white font-bold">
                                Siguiente
                            </Link>
>>>>>>> 9b106a7 (feat: templates for steps)
                        </SubmitButton>
                    </form>
                </div>
            </div>
        </section>
    );
}
