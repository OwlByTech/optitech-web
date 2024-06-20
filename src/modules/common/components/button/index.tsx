import { Button as ButtonNext, ButtonProps } from "@nextui-org/react";

export function Button({
  className,
  title,
  type,
  children,
  ...props
}: ButtonProps) {
  const combinedClassName = `text-white bg-black ${className}`;

  return (
    <ButtonNext
      className={combinedClassName}
      radius="none"
      type={type}
      {...props}
    >
      {children}
    </ButtonNext>
  );
}
