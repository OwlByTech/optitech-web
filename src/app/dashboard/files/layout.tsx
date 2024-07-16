import { DirectoryTree } from "@/modules/files/components/directory-tree";
import { RouteDirectory } from "@/modules/files/components/route-directory";

export default async function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <section className="flex w-full max-w-full h-full flex-row gap-4">
            <DirectoryTree />
            <div className="flex  w-full max-w-full h-full rounded-lg flex-col bg-white gap-8  md:gap-0">
                <RouteDirectory />
                {children}
            </div>
        </section>
    );
}
