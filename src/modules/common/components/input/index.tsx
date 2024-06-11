import { Input as InputText, InputProps } from "@nextui-org/react"


import * as React from "react"


export function Input({ label, className, type, ...props }: InputProps) {
    return (
        <InputText
            className="border border-black"
            label={label}
            color="default"
            type={type}
            radius="none"

            {...props}
        />
    )
}

