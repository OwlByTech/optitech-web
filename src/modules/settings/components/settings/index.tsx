import { SignOut } from "@/modules/auth/components/sign-out";
import { RoutesSettings } from "../routes-settings";

export function Settings({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <section className="flex flex-grow gap-4 h-full rounded-3xl">
      <div className="flex flex-col justify-between bg-white h-full w-3/12 border rounded-3xl p-5 2xl:w-2/12">
        <div className="flex flex-col gap-2">
          <RoutesSettings />
        </div>
        <div>
          <SignOut className="bg-white rounded-xl hover:bg-gray-200" />
        </div>
      </div>
      <div className="flex flex-col justify-between bg-white h-full w-9/12 border rounded-3xl p-5">
        {children}
      </div>
    </section>
  );
}
