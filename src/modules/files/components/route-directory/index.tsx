"use client"
import { LinkRef } from "@/modules/common/components/link-ref"
import { ROUTES_SIDEBAR } from "@/modules/dashboard/types"
import { useAtom } from "jotai"
import { usePathname } from "next/navigation"
import { FiChevronRight } from "react-icons/fi"
import { directoryRoute } from "../../context"

export function RouteDirectory() {
    const pathname = usePathname()

    const [directories, setDirectories] = useAtom(directoryRoute)

    return (
        <div className="flex flex-row p-2">

            {directories && directories.map((value, index) => (
                <div
                    className={` flex flex-row items-center text-gray-500 font-light text-sm `}
                >
                    <LinkRef
                        href={`${ROUTES_SIDEBAR.FILES}/${value?.id}`}
                        className={`hover:bg-gray-50 p-2 ${Number(pathname.split("/")[3]) === value.id && "font-medium"} `}
                    >
                        {value.name}
                    </LinkRef>

                    {index < (directories.length - 1) && <FiChevronRight color="#B5B5B5" strokeWidth={1} className="h-6 w-6 " />}
                </div>
            ))
            }
        </div >
    )

}
