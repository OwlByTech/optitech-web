"use client";
import { Directory } from "../types";
import { FolderView } from "../components/folder-view";
import { useAtom } from "jotai";
import { directoryRoute } from "../context";
import { useEffect, useState } from "react";
import { FolderDocumentOptions } from "../components/folder-document-options";

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
  const [isOpenOptions, setIsOpenOptions] = useState<IsOpenOptionsType | null>(null);
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

  const onSelectOption = (type: DocumentDiretoryType, index: number, action: string) => {
    console.log(type, index, action);
  };

  return (
    <div className="flex flex-col p- w-full h-full p-4">
      <div className="grid grid-cols-6">
        {directory.parentId !== 0 && (
          <FolderView directory={{ id: directory.parentId, name: "..." }} />
        )}
        {directory.directory?.map((value, index) => (
          <FolderDocumentOptions
            onOpenOptions={() => onOpenOptions("directory", index)}
            isOpenOptions={isOpenOptionsHandler("directory", index)}
            onSelectOption={(action) => onSelectOption("document", index, action)}
            type="directory"
            value={value}
          />
        ))}
        {directory.document?.map((value, index) => (
          <FolderDocumentOptions
            onOpenOptions={() => onOpenOptions("document", index)}
            isOpenOptions={isOpenOptionsHandler("document", index)}
            onSelectOption={(action) => onSelectOption("document", index, action)}
            type="document"
            value={value}
          />
        ))}
      </div>
    </div>
  );
}
