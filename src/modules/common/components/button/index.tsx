import { clx } from "@/utils/clx";
import { Button as ButtonNext, ButtonProps } from "@nextui-org/react";

export function Button({
    className,
    title,
    type,
    children,
    ...props
}: ButtonProps) {
    return (
        <ButtonNext
            className={clx(`text-white bg-black `, className)}
            radius="none"
            type={type}
            {...props}
        >
            {children}
        </ButtonNext>
    );
}
