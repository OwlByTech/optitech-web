import { FiMoreVertical } from "react-icons/fi";
import { Directory, File } from "../../types";
import { FolderView } from "../folder-view";
import { FileView } from "../file-view";
import { Button } from "@/modules/common/components/button";

export type FolderDocumentOptionsProps = {
  type: "document" | "directory";
  value: Directory | File;
  isOpenOptions: boolean;
  onOpenOptions?: () => void;
  onSelectOption?: (action: string) => void;
  onClosedOption?: () => void;
};

const dirOptions = [
  {
    action: "rename",
    title: "Renombrar",
  },
];

const docOptions = [
  {
    action: "rename",
    title: "Renombrar",
  },
  {
    action: "download",
    title: "Descargar",
  },
];

export function FolderDocumentOptions(props: FolderDocumentOptionsProps) {
  const buttonStyles = "w-full bg-white text-black";

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
              ? dirOptions.map((option) => {
                  const onSelectOption = () => {
                    props.onSelectOption && props.onSelectOption(option.action);
                  };
                  return (
                    <Button onClick={onSelectOption} className={buttonStyles}>
                      {option.title}
                    </Button>
                  );
                })
              : docOptions.map((option) => {
                  const onSelectOption = () => {
                    props.onSelectOption && props.onSelectOption(option.action);
                  };
                  return (
                    <Button onClick={onSelectOption} className={buttonStyles}>
                      {option.title}
                    </Button>
                  );
                })}
          </div>
        )}
      </div>
    </div>
  );
}
