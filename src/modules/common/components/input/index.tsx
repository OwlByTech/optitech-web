import { Input as InputText, InputProps } from "@nextui-org/react";
import * as React from "react";

export function Input({
    label,
    className,
    type,
    defaultValue,
    classNames,
    ...props
}: InputProps) {
    return (
        <InputText
            className={className}
            label={label}
            color="default"
            type={type}
            radius="sm"

            classNames={{
                base: 'hover:bg-none',
                inputWrapper: 'bg-white hover:bg-white border-1 border-black',
                ...classNames
            }}
            defaultValue={defaultValue}
            {...props}
        />
    );
}
