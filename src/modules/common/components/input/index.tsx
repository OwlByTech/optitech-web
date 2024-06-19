import { Input as InputText, InputProps } from "@nextui-org/react";
import * as React from "react";

export function Input({ label, className, type, ...props }: InputProps) {
  const combinedClassName = `${className}`;

  return (
    <InputText
      className={combinedClassName}
      label={label}
      color="default"
      type={type}
      radius="none"
      {...props}
    />
  );
}
