import {Selection, SelectItem as NextUISelectItem, Select as SelectUI} from '@nextui-org/react';
export type SelectItem = {
  key: string | number;
  label: string;
};
export type SelectProps = {
  defaultItem: string;
  items: SelectItem[];
  onSelect: (selection: Selection) => void;
  isDisabled?: boolean;
};

export default function Select(props: SelectProps) {
  return (
    <SelectUI
      isRequired
      onSelectionChange={props.onSelect}
      disallowEmptySelection={true}
      defaultSelectedKeys={[props.defaultItem]}
      isDisabled={props.isDisabled}
    >
      {props.items.map(item => {
        return <NextUISelectItem key={item.key}>{item.label}</NextUISelectItem>;
      })}
    </SelectUI>
  );
}
