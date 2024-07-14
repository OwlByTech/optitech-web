import { LinkRef } from "@/modules/common/components/link-ref";
import { File, FolderLayout } from "../../types";
import { AiFillFile } from "react-icons/ai";
import { ROUTES_SIDEBAR } from "@/modules/dashboard/types";

type Props = {
  document: File;
  layout: FolderLayout;
};

export function FileView({ document }: Props) {
  return (
    <LinkRef
      href={`${ROUTES_SIDEBAR.FILES}/document/${document?.id}`}
      className="flex items-center w-full h-full p-2 gap-2"
    >
      <AiFillFile size={16} color="#FFC754" strokeWidth={1} />
      <span>{document?.name}</span>
    </LinkRef>
  );
}
