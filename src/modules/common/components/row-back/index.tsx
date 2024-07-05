import { FiArrowLeftCircle } from "react-icons/fi";
import { LinkRef } from "../link-ref";

export function RowBack({ href }: { href: string }) {

    return <LinkRef className="flex flex-row gap-2" href={href}>
        <FiArrowLeftCircle className=" h-6 w-6 md:h-7 md:w-7" />
        <h1 className="text-lg">Anterior</h1>
    </LinkRef>
}
