import { Profile } from "../components/profile";
import { Routes } from "./routes";

export function SideBar() {
    return (
        <div className="hidden w-[300px] md:flex h-full flex-col pt-8 px-4">
            <Profile />
            <Routes />
        </div>
    );
  return (
    <div className="hidden w-[280px] md:flex h-full flex-col pt-12 pb-5 px-5 gap-4">
      <Profile />
      <Routes />
    </div>
  );
}
