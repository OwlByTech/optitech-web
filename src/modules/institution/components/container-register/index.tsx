import { BackButton } from "@/modules/common/components/back-button";
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
        <div className="flex flex-col justify-center flex-grow gap-7 overflow-hidden">
            {href && <BackButton title="Anterior" href={href} />}
            <div className="flex flex-col gap-1 w-full">
                <h1 className="font-extrabold text-3xl">
                    {title}
                </h1>
                {subtitle && <p className="text-xl">
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
