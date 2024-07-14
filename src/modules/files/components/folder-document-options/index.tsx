import { FiMoreVertical } from "react-icons/fi";
import { Directory, File } from "../../types";
import { FolderView } from "../folder-view";
import { FileView } from "../file-view";
import { Button } from "@/modules/common/components/button";
import { ReactElement } from "react";
import { dirOptions } from "./directory";
import { docOptions } from "./document";

export type FolderDocumentOptionsProps = {
  type: "document" | "directory";
  value: Directory | File;
  isOpenOptions: boolean;
  onOpenOptions?: () => void;
  onSelectOption?: (component: ReactElement) => void;
  onClosedOption?: () => void;
};

export type OptionComponentProps = {
  value: Directory | File;
  onClose: () => void;
};

type FolderDocumentOptionProps = {
  onSelectOption: ((component: ReactElement) => void) | undefined;
  option: any;
  title: string;
};

function FolderDocumentOption(props: FolderDocumentOptionProps) {
  const onSelectOption = () => {
    props.onSelectOption && props.onSelectOption(props.option.component);
  };
  return (
    <Button onClick={onSelectOption} className="w-full bg-white text-black">
      {props.option.title}
    </Button>
  );
}

export function FolderDocumentOptions(props: FolderDocumentOptionsProps) {
  return (
    <div className="relative hover:bg-gray-50 flex flex-col items-center justify-between h-24 w-24 rounded-lg bg-white text-black font-light text-sm gap-2 border">
      {props.type === "directory" ? (
        <FolderView directory={props.value as Directory} />
      ) : (
        <FileView document={props.value as File} />
      )}
      <div
        onClick={props.onOpenOptions}
        className="absolute top-1 right-1 cursor-pointer hover:bg-gray-200 rounded-full p-1"
      >
        <FiMoreVertical />
        {props.isOpenOptions && (
          <div className="absolute right-2 top-6 bg-white border border-black">
            {props.type === "directory"
              ? dirOptions.map((option) => (
                  <FolderDocumentOption
                    onSelectOption={props.onSelectOption}
                    option={option}
                    title={option.title}
                  />
                ))
              : docOptions.map((option) => (
                  <FolderDocumentOption
                    onSelectOption={props.onSelectOption}
                    option={option}
                    title={option.title}
                  />
                ))}
          </div>
        )}
      </div>
    </div>
  );
}
