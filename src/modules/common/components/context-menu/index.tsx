"use client";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
} from "@nextui-org/react";
import { ReactNode, useEffect, useRef, useState } from "react";

export type ContextMenuProps = {};

export function ContextMenu(props: ContextMenuProps) {
  const [position, setPosition] = useState<{ x: number; y: number }>();
  const handler = (e: MouseEvent) => {
    e.preventDefault();
    setPosition({ x: e.pageX, y: e.pageY });
  };

  useEffect(() => {
    document.addEventListener("contextmenu", handler);
    return () => {
      document.removeEventListener("contextmenu", handler);
    };
  }, []);

  if (!position) return <></>;

  return (
    <Dropdown
      isOpen={true}
      onClose={() => setPosition(undefined)}
      style={{ top: position.y, left: position.x }}
    >
      <></>
      <DropdownMenu onAction={(key) => console.log(key)}>
        <DropdownItem key="text">Text</DropdownItem>
        <DropdownItem key="number">Number</DropdownItem>
        <DropdownItem key="date">Date</DropdownItem>
        <DropdownItem key="single_date">Single Date</DropdownItem>
        <DropdownItem key="iteration">Iteration</DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
}
