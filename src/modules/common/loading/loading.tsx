import { clx } from "@/utils/clx";
import { Spinner } from "@nextui-org/react";

export default function Loading({ className }: { className?: string }) {
    return (
        <div className={clx("flex w-full h-full justify-center items-center", className)}>
            <Spinner size="md" />
        </div>
    )
}
