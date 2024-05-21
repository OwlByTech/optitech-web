import { Button as ButtonNext, ButtonProps } from "@nextui-org/react";

export function Button({ className, title, type, children, ...props }: ButtonProps) {

    return <ButtonNext className="text-black" type={type} {...props} >{children}</ButtonNext>

}
