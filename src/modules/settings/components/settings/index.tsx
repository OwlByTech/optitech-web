import { SignOut } from "@/modules/auth/components/sign-out";
import { RoutesSettings } from "../routes-settings";
import { RoutesSettingsMobile } from "../routes-settings-mobile";

export function Settings({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <section className="flex md:flex-row md:flex-grow flex-col gap-4 h-full w-auto rounded-3xl">
      <div className="flex flex-col justify-between bg-white h-auto w-screen md:w-3/12 border rounded-3xl p-5 md:2xl:w-2/12">
        <div className="hidden md:flex flex-col gap-2">
          <RoutesSettings />
        </div>
        <div className="flex md:hidden flex-col gap-2">
          <RoutesSettingsMobile />
        </div>
        <div className="hidden md:block">
          <SignOut className="bg-white rounded-xl border border-black text-black hover:bg-gray-200" />
        </div>
      </div>
      <div className="flex flex-col justify-between bg-white h-auto md:w-9/12 border rounded-3xl p-5">
        {children}
      </div>
    </section>
  );
}
