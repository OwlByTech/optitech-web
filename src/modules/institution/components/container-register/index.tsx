import { RowBack } from "@/modules/common/components/row-back";
import { SubmitButton } from "@/modules/common/components/submit-button";
import { ReactNode } from "react";

type Props = {
    children: ReactNode,
    href?: string,
    title: string,
    subtitle?: string
    action: (formdata: FormData) => void
    buttonName: string
}

export function ContainerRegister({ children, href, title, subtitle, action, buttonName }: Props) {

    return (
        <div className="flex flex-col justify-center h-screen w-screen md:flex-grow px-10 gap-7 py-20 md:w-1/2 overflow-hidden">
            {href && <RowBack href={href} />}
            <div className="flex flex-col gap-1 w-full">
                <h1 className="font-extrabold text-lg sm:text-3xl">
                    {title}
                </h1>
                {subtitle && <p className="text-sm sm:text-xl">
                    {subtitle}
                </p>}
            </div>
            <form action={action} className="flex flex-col gap-6">
                {children}
                <SubmitButton className="rounded-lg">
                    {buttonName}
                </SubmitButton>
            </form>
        </div>
    )
}
