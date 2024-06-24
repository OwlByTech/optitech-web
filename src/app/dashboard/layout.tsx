import { SideBar } from "@/modules/dashboard/templates/sidebar";
import { TopBar } from "@/modules/dashboard/templates/topbar";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <section className="flex flex-row">
      <div className="hidden md:block h-screen w-[300px] bg-white">
        <SideBar />
      </div>
      <div className="flex flex-grow h-screen flex-col bg-gray-100 gap-8 md:gap-0 ">
        <TopBar />
        <div className="bg-gray-100 h-full mx-3 mb-3 rounded-md">
          {children}
        </div>
      </div>
    </section>
  );
}
