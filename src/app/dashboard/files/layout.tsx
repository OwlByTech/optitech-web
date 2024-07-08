import { DirectoryTree } from "@/modules/files/components/directory-tree";

export default async function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <section className="flex flex-grow h-full gap-5 flex-row px-5">
            <DirectoryTree />
            <div className="flex flex-grow h-full rounded-lg flex-col bg-white gap-8 md:gap-0 ">
                {children}
            </div>
        </section>
    );
}
