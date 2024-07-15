"use client";
import { LinkRef } from "@/modules/common/components/link-ref";
import { ROUTES_SIDEBAR } from "@/modules/dashboard/types";
import { useAtom } from "jotai";
import { usePathname } from "next/navigation";
import {
  FiChevronRight,
  FiFolder,
  FiFolderPlus,
  FiGrid,
  FiList,
  FiPauseCircle,
  FiUpload,
} from "react-icons/fi";
import { directoryRoute, folderLayout } from "../../context";
import { Button } from "@/modules/common/components/button";
import { useDisclosure } from "@nextui-org/react";
import { CreateDirectoryModal } from "../create-directory";
import { uploadFileHandler } from "@/modules/common/components/upload-file/handlers";
import { toast } from "sonner";

export function RouteDirectory() {
  const pathname = usePathname();

  const [layout, setLayout] = useAtom(folderLayout);
  const [directories, setDirectories] = useAtom(directoryRoute);

  const curParentDirectory =
    directories?.length > 1 && directories[directories?.length - 1];

  const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure();

  const uploadFile = async () => {
    try {
      const files: FileList = await uploadFileHandler(["pdf", "docx"], 10);
      // TODO: send file to api and reload the page with router refresh
    } catch (e) {
      const error = e as Error;
      toast.error(error.message);
    }
  };

  return (
    <div className="flex flex-row p-2 justify-between">
      <div className="flex">
        {directories &&
          directories.map((value, index) => (
            <div
              className={` flex flex-row items-center text-gray-500 font-light text-sm `}
            >
              <LinkRef
                href={`${ROUTES_SIDEBAR.FILES}/${value?.id}`}
                className={`hover:bg-gray-50 p-2 ${
                  Number(pathname.split("/")[3]) === value.id && "font-medium"
                } `}
              >
                {value.name}
              </LinkRef>

              {index < directories.length - 1 && (
                <FiChevronRight
                  color="#B5B5B5"
                  strokeWidth={1}
                  className="h-6 w-6 "
                />
              )}
            </div>
          ))}
      </div>

      <div className="flex gap-2">
        <Button
          onClick={() => {
            onOpen();
          }}
          className="bg-white border text-xs text-black h-10 md:w-32"
          isIconOnly
          radius="md"
          size="md"
          startContent={<FiFolderPlus className="md:h-5 md:w-5 w-6 h-6" />}
        >
          <span className="md:pl-2 hidden md:block">Crear carpeta</span>
        </Button>

        {curParentDirectory && (
          <CreateDirectoryModal
            curDir={curParentDirectory}
            isOpen={isOpen}
            onOpenChange={onOpenChange}
            onClose={onClose}
          />
        )}

        <Button
          className="bg-white border text-xs text-black h-10 md:w-32"
          isIconOnly
          radius="md"
          size="md"
          onClick={uploadFile}
          startContent={<FiUpload className="md:h-5 md:w-5 w-6 h-6" />}
        >
          <span className="md:pl-2 hidden md:block">Subir archivo</span>
        </Button>

        <div className="flex gap-2">
          <Button
            className={
              layout === "list" ? "text-white bg-black" : "bg-white text-black"
            }
            onClick={() => setLayout("list")}
            isIconOnly
            radius="md"
            size="md"
            startContent={<FiList className="md:h-5 md:w-5 w-6 h-6" />}
          />
          <Button
            className={
              layout === "grid" ? "text-white bg-black" : "bg-white text-black"
            }
            onClick={() => setLayout("grid")}
            isIconOnly
            radius="md"
            size="md"
            startContent={<FiGrid className="md:h-5 md:w-5 w-6 h-6" />}
          />
        </div>
      </div>
    </div>
  );
}
