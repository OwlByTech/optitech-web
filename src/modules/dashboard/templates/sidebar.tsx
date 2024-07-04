import { Profile } from "../components/profile";
import { Routes } from "./routes";

export function SideBar() {
    return (
        <div className="flex h-full flex-col pt-12 pb-5 px-5 gap-4">
            <Profile />
            <Routes />
        </div>
    );
}
