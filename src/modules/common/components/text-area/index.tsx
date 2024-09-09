import React from 'react';
import {TextAreaProps, Textarea as TextareaUI} from '@nextui-org/react';

export function Textarea({...props}: TextAreaProps) {
  return (
    <TextareaUI
      required
      placeholder="Enter your description"
      variant="bordered"
      radius="sm"
      color="default"
      {...props}
    />
  );
}
