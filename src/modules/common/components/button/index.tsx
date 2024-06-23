import { clx } from "@/utils/clx";
import { Button as ButtonNext, ButtonProps } from "@nextui-org/react";
import Link from "next/link";

interface CustomButtonProps extends ButtonProps {
  href?: string;
}

export function Button({
  className,
  title,
  type,
  children,
  href,
  ...props
}: CustomButtonProps) {
  const buttonElement = (
    <ButtonNext className={className} radius="none" type={type} {...props}>
      {children}
    </ButtonNext>
  );

  if (href) {
    return (
      <Link href={href} passHref>
        {buttonElement}
      </Link>
    );
  }

  return buttonElement;
}
