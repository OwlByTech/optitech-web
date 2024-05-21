import { Input as InputText, InputProps } from "@nextui-org/react"


import * as React from "react"


export const Input = ({ label, className, type, ...props }: InputProps) => {
    return (
        <InputText
            className=""
            label={label}
            type={type}
            {...props}
        />
    )
}

