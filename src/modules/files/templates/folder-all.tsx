"use client";
import { Directory, File } from "../types";
import { FolderView } from "../components/folder-view";
import { useAtom } from "jotai";
import { directoryRoute } from "../context";
import { ReactElement, ReactNode, useEffect, useRef, useState } from "react";
import {
  FolderDocumentOptions,
  OptionComponentProps,
} from "../components/folder-document-options";

export type DocumentDirectoryType = "document" | "directory";

type OptionStateType = {
  type: DocumentDirectoryType;
  index: number;
  component: React.ComponentType<OptionComponentProps>;
  value: Directory | File;
} | null;

type Props = {
  directory: Directory;
  routeDirectory: Directory[];
};

type DocumentDiretoryType = "document" | "directory";
type IsOpenOptionsType = {
  type: DocumentDiretoryType;
  index: number;
};

export function FolderAll({ directory, routeDirectory }: Props) {
  const [isOpenOptions, setIsOpenOptions] = useState<IsOpenOptionsType | null>(
    null
  );
  const [optionState, setOptionState] = useState<OptionStateType>();
  const [_, setDirectories] = useAtom(directoryRoute);

  useEffect(() => {
    setDirectories(routeDirectory);
  }, [routeDirectory]);

  const onOpenOptions = (type: DocumentDiretoryType, index: number) => {
    if (type === isOpenOptions?.type && index === index) {
      setIsOpenOptions(null);
    } else {
      setIsOpenOptions({ type, index });
    }
  };

  const isOpenOptionsHandler = (type: DocumentDiretoryType, index: number) => {
    return isOpenOptions?.type === type && isOpenOptions.index === index;
  };

  const onSelectOption = (
    type: DocumentDiretoryType,
    index: number,
    component: React.ComponentType<OptionComponentProps>,
    value: Directory | File
  ) => {
    setOptionState({ type, index, component, value });
  };

  return (
    <div className="flex flex-col p- w-full h-full p-4">
      <div className="grid grid-cols-6 gap-4">
        {optionState && (
          <optionState.component
            value={optionState.value}
            onClose={() => setOptionState(null)}
          />
        )}

        {directory.parentId !== 0 && (
          <FolderView directory={{ id: directory.parentId, name: "..." }} />
        )}
        {directory.directory?.map((value, index) => (
          <FolderDocumentOptions
            key={index}
            onOpenOptions={() => onOpenOptions("directory", index)}
            isOpenOptions={isOpenOptionsHandler("directory", index)}
            onSelectOption={(component) =>
              onSelectOption("document", index, component, value)
            }
            type="directory"
            value={value}
          />
        ))}
        {directory.document?.map((value, index) => (
          <FolderDocumentOptions
            key={index}
            onOpenOptions={() => onOpenOptions("document", index)}
            isOpenOptions={isOpenOptionsHandler("document", index)}
            onSelectOption={(component) =>
              onSelectOption("document", index, component, value)
            }
            type="document"
            value={value}
          />
        ))}
      </div>
    </div>
  );
}
