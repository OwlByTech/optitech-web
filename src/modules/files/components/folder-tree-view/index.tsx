"use client"
import { LinkRef } from "@/modules/common/components/link-ref"
import { SubmitButton } from "@/modules/common/components/submit-button"
import { FiChevronDown, FiChevronRight, FiFile, FiFolder } from "react-icons/fi"
import { Directory } from "../types"
import { useState } from "react"

type Props = {
    folder: Directory,
}

export function FolderViewTree({ folder }: Props) {
    const [open, setOpen] = useState(false)
    return (
        <>
            <div className={`flex flex-row items-center justify-between h-8 rounded-lg  text-xs gap-2 ${!folder.child ? "px-3 border" : "p-1 border "} ${open && "bg-gray-100 border-none"}  `}>
                <div className="flex flex-row flex-grow gap-2">
                    {folder.child ?
                        <FiFolder strokeWidth={1} className="h-4 w-4" />
                        :
                        <FiFile strokeWidth={1} className="h-4 w-4" color="#000000" />
                    }
                    <LinkRef className="flex-grow" href={`${folder?.id}`}>
                        {folder?.name}
                    </LinkRef>

                </div>
                {folder.child &&

                    <form action={() => {
                        setOpen(!open)
                    }}>
                        <SubmitButton isIconOnly className="bg-none h-8 p-0 bg-transparent hover:bg-gray-300" >
                            {open ? <FiChevronDown strokeWidth={1} className="h-4 w-4" color="#000000" /> : <FiChevronRight className="h-4 w-4" strokeWidth={1} color="#000000" />}
                        </SubmitButton>
                    </form>
                }
            </div>
            {open && folder?.child &&
                <div className="flex flex-row pl-2 gap-1 w-full">
                    <span className="border-l-1 my-3 border-b-1    w-2" />
                    <div className="flex flex-col gap-2 w-full ">
                        {open && folder?.child?.map((value) => <FolderViewTree folder={value} />)}
                    </div>
                </div>
            }
        </>
    )

}
