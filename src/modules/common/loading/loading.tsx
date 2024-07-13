import { clx } from "@/utils/clx";
import Spinner from "../icons/Spinner";

export default function Loading({ className }: { className?: string }) {
    return (
        <div className={clx("flex w-full h-full justify-center items-center", className)}>
            <Spinner className="h-6 w-6" />
        </div>
    )
}
