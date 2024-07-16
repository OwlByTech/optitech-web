import { SideBar } from "@/modules/dashboard/templates/sidebar";
import { TopBar } from "@/modules/dashboard/templates/topbar";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <section className="flex flex-row h-screen w-screen">
      <SideBar />
      <div className="flex flex-grow h-screen flex-col bg-gray-100 gap-8 md:gap-0 w-screen">
        <TopBar />
        <div className="bg-gray-100 h-full mx-3 mb-3 rounded-md">
          {children}
        </div>
      </div>
    </section>
  );
}
