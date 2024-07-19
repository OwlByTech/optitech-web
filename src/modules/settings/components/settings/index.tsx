import { SignOut } from "@/modules/auth/components/sign-out";
import { RoutesSettings } from "../routes-settings";
import { RoutesSettingsMobile } from "../routes-settings-mobile";

export function Settings({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <section className="flex md:flex-row md:flex-grow flex-col gap-4 h-full px-4 pb-4 overflow-auto w-auto rounded-lg">
            <div className="flex flex-col justify-between bg-white h-auto md:w-3/12 shadow-md rounded-lg p-5 md:2xl:w-2/12">
                <div className="hidden md:flex flex-col gap-2">
                    <RoutesSettings />
                </div>
                <div className="flex md:hidden flex-col gap-2">
                    <RoutesSettingsMobile />
                </div>
                <div className="hidden md:block">
                    <SignOut className="bg-white rounded-lg font-normal text-black hover:text-gray-600" />
                </div>
            </div>
            <div className="flex flex-col justify-between bg-white h-auto md:w-9/12  shadow-md rounded-lg p-5">
                {children}
            </div>
        </section>
    );
}
