import React, {ReactNode, useState} from 'react';
import {Autocomplete, AutocompleteItem, AutocompleteProps} from '@nextui-org/react';
import {set} from 'zod';

export type SelectSearchProps = {
  items: any;
  label?: string;
  placeholder?: string;
  onSelectionChange: (key: any) => void;
};

export default function SelectSearch(props: SelectSearchProps) {
  const [fieldState, setFieldState] = React.useState({
    selectedKey: '',
    inputValue: '',
    items: props.items,
  });

  const onInputChange = value => {
    setFieldState(prevState => ({
      inputValue: value,
      selectedKey: value === '' ? null : prevState.selectedKey,
      items: props.items.filter(item => item.name.toLowerCase().includes(value.toLowerCase())),
    }));
  };

  return (
    <Autocomplete
      inputValue={fieldState.inputValue}
      items={fieldState.items}
      label={props.label}
      placeholder={props.placeholder}
      selectedKey={fieldState.selectedKey}
      variant="bordered"
      isClearable={false}
      onInputChange={onInputChange}
      onSelectionChange={key => {
        setFieldState({
          inputValue: props.items.filter(item => item.id === Number(key)).name,
          selectedKey: key,
          items: props.items,
        });
        props.onSelectionChange(key);
      }}
    >
      {(item: any) => <AutocompleteItem key={item.id}>{item.name}</AutocompleteItem>}
    </Autocomplete>
  );
}
