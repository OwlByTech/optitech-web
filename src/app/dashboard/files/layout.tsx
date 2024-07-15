import { DirectoryTree } from "@/modules/files/components/directory-tree";
import { RouteDirectory } from "@/modules/files/components/route-directory";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <section className="flex h-full bg-red-50 gap-4">
      <DirectoryTree />
      <div className="flex w-full rounded-lg flex-col bg-white gap-8 md:gap-0">
        <RouteDirectory />
        {children}
      </div>
    </section>
  );
}
