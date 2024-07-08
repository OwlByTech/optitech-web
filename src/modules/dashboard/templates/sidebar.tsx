import { Profile } from "../components/profile";
import { Routes } from "./routes";

export function SideBar() {
    return (
        <div className="hidden md:flex flex-col sticky top-1 left-3 pt-12 pb-5 px-5 gap-4  w-[250px] bg-white">
            <Profile />
            <Routes />
        </div>
    );

}
