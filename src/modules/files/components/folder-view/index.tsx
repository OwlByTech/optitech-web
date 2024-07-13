import { LinkRef } from "@/modules/common/components/link-ref";
import { Directory } from "../../types";
import { AiFillFolder, AiFillFolderOpen } from "react-icons/ai";
import { ROUTES_SIDEBAR } from "@/modules/dashboard/types";

type Props = {
  directory: Directory;
};

export function FolderView({ directory }: Props) {
  return (
    <LinkRef
      href={`${ROUTES_SIDEBAR.FILES}/${directory?.id}`}
      className="flex flex-col items-center w-full h-full p-2"
    >
      <AiFillFolder color="#FFC754" strokeWidth={1} className="h-16 w-16" />
      <span>{directory?.name}</span>
    </LinkRef>
  );
}
