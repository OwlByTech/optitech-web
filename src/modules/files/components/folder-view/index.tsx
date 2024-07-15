import { LinkRef } from "@/modules/common/components/link-ref";
import { Directory, FolderLayout } from "../../types";
import { AiFillFolder } from "react-icons/ai";
import { ROUTES_SIDEBAR } from "@/modules/dashboard/types";

type Props = {
  directory: Directory;
  layout: FolderLayout;
};

const MAX_GRID_NAME_LENGTH = 17;
const MAX_LIST_NAME_LENGTH = 70;

export function FolderView(props: Props) {
  const name = props.directory.name!;
  return (
    <LinkRef
      href={`${ROUTES_SIDEBAR.FILES}/${props.directory?.id}`}
      className="flex items-center w-full h-full p-2 gap-2"
    >
      <AiFillFolder color="#FFC754" strokeWidth={1} />
      {props.layout === "grid" ? (
        name.length > MAX_GRID_NAME_LENGTH ? (
          <span>{name.slice(0, MAX_GRID_NAME_LENGTH) + "..."}</span>
        ) : (
          <span>{name}</span>
        )
      ) : name.length > MAX_LIST_NAME_LENGTH ? (
        <span>{name.slice(0, MAX_LIST_NAME_LENGTH) + "..."}</span>
      ) : (
        <span>{name}</span>
      )}
      {}
    </LinkRef>
  );
}
