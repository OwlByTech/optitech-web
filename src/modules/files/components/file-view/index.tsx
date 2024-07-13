import { LinkRef } from "@/modules/common/components/link-ref";
import { File } from "../../types";
import { AiFillFile } from "react-icons/ai";
import { ROUTES_SIDEBAR } from "@/modules/dashboard/types";

type Props = {
  document: File;
};

export function FileView({ document }: Props) {
  return (
      <LinkRef
        href={`${ROUTES_SIDEBAR.FILES}/document/${document?.id}`}
        className="flex flex-col items-center w-full h-full p-2"
      >
        <div className="flex items-center justify-between w-full">
          <AiFillFile color="#FFC754" strokeWidth={1} className="h-16 w-16" />
        </div>
        <span>{document?.name}</span>
      </LinkRef>
  );
}
