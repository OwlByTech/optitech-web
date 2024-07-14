"use client";
import { Directory, File } from "../types";
import { FolderView } from "../components/folder-view";
import { useAtom } from "jotai";
import { directoryRoute, folderLayout } from "../context";
import {
  FolderDocumentOptions,
  OptionComponentProps,
} from "../components/folder-document-options";
import { useEffect, useState } from "react";

export type DocumentDirectoryType = "document" | "directory";

type OptionStateType = {
  type: DocumentDirectoryType;
  index: number;
  component: React.ComponentType<OptionComponentProps>;
  value: Directory | File;
} | null;

type DocumentDiretoryType = "document" | "directory";
type IsOpenOptionsType = {
  type: DocumentDiretoryType;
  index: number;
};

export type FolderAllProps = {
  // TODO: Add types from the services.
  directory: Directory;
  routeDirectory: Directory[];
};

export function FolderAll(props: FolderAllProps) {
  const [layout, setLayout] = useAtom(folderLayout);
  const [isOpenOptions, setIsOpenOptions] = useState<IsOpenOptionsType | null>(
    null
  );
  const [optionState, setOptionState] = useState<OptionStateType>();
  const [_, setDirectories] = useAtom(directoryRoute);

  useEffect(() => {
    setDirectories(props.routeDirectory);
  }, [props.routeDirectory]);

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
    <div className="h-full p-4 overflow-auto">
      <div
        className={
          layout === "grid" ? "grid grid-cols-4 gap-4" : "flex flex-col gap-4"
        }
      >
        {optionState && (
          <optionState.component
            value={optionState.value}
            onClose={() => setOptionState(null)}
          />
        )}

        {/* {props.directory.parentId !== 0 && (
          <FolderView
            directory={{ id: props.directory.parentId, name: "..." }}
          />
        )} */}
        {props.directory.directory?.map((value, index) => (
          <FolderDocumentOptions
            layout={layout}
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
        {props.directory.document?.map((value, index) => (
          <FolderDocumentOptions
            layout={layout}
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
