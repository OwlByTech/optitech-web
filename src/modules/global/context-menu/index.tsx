"use client";
import { Dropdown, DropdownItem, DropdownMenu } from "@nextui-org/react";
import { useAtom } from "jotai";
import { useEffect, useState } from "react";
import { contextMenuStorage } from "./context";

export type ContextMenuItems = {
  items: ContextMenuItem[];
  attribute: string;
}[];

export type ContextMenuItem = {
  title: string;
  key: string;
  handler: () => void;
};

export function ContextMenu() {
  const [items] = useAtom(contextMenuStorage);
  const [menuState, setMenuState] = useState<{
    x: number;
    y: number;
    attribute: number;
  }>();
  const handler = (e: MouseEvent) => {
    e.preventDefault();
    const attribute = e.target?.getAttribute("data-contextmenu");
    const attributeIndex = items.findIndex(
      (item) => item.attribute === attribute
    );
    if (attributeIndex != -1) {
      setMenuState({ x: e.pageX, y: e.pageY, attribute: attributeIndex });
    }
  };

  useEffect(() => {
    console.log("hero");
    document.addEventListener("contextmenu", handler);
    return () => {
      document.removeEventListener("contextmenu", handler);
    };
  }, [items]);

  const onClose = () => {
    setMenuState(undefined);
  };

  if (!menuState) return <></>;

  return (
    <Dropdown
      isOpen={true}
      onClose={onClose}
      style={{ top: menuState.y, left: menuState.x }}
    >
      <></>
      <DropdownMenu
        onAction={(key) => {
          items[menuState.attribute].items.map((item) => {
            if (key === item.key) item.handler();
          });
        }}
      >
        {items[menuState.attribute].items.map((item) => {
          return <DropdownItem key={item.key}>{item.title}</DropdownItem>;
        })}
      </DropdownMenu>
    </Dropdown>
  );
}
