import { DirectoryTree } from "@/modules/files/components/directory-tree";
import { getDirectoryService } from "@/modules/files/services";

export default async function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const directoryTree = await getDirectoryService(1)
    console.log(directoryTree)
    return (
        <section className="flex flex-grow h-full gap-5 flex-row px-5">
            <DirectoryTree directoryTree={directoryTree} />
            <div className="flex flex-grow h-full rounded-lg flex-col bg-white gap-8 md:gap-0 ">
                {children}
            </div>
        </section>
    );
}
