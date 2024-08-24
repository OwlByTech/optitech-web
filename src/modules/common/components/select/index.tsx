import {Selection, SelectItem as NextUISelectItem, Select as SelectUI} from '@nextui-org/react';

export type SelectKey = number | string;

export type SelectItem = {
  key: SelectKey;
  label: string;
};
export type SelectProps = {
  defaultItem: string;
  items: SelectItem[];
  disableKeys: string[];
  onSelect: (key: SelectKey) => void;
  isDisabled?: boolean;
};

export default function Select(props: SelectProps) {
  return (
    <SelectUI
      isRequired
      onSelectionChange={(key: Selection) => {
        const firstValue = [...key][0];
        if (props.onSelect && firstValue !== undefined) {
          props.onSelect(firstValue);
        }
      }}
      disallowEmptySelection={true}
      defaultSelectedKeys={[props.defaultItem]}
      disabledKeys={props.disableKeys}
      isDisabled={props.isDisabled}
    >
      {props.items.map(item => {
        return <NextUISelectItem key={item.key}>{item.label}</NextUISelectItem>;
      })}
    </SelectUI>
  );
}
