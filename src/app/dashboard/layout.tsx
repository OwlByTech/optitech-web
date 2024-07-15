import { SideBar } from "@/modules/dashboard/templates/sidebar";
import { TopBar } from "@/modules/dashboard/templates/topbar";

export default async function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <section className="flex flex-row h-screen w-screen overflow-hidden">
            <SideBar />
            <div className="flex h-full w-full flex-col bg-gray-100 gap-8 md:gap-0 md:px-4 md:pb-4">
                <TopBar />
                <div className="h-full bg-gray-100 rounded-md">
                    {children}
                </div>
            </div>
        </section>
    );
}
