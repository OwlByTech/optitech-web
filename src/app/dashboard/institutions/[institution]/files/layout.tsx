import {DirectoryTree} from '@/modules/files/components/directory-tree';
import {RouteDirectory} from '@/modules/files/components/route-directory';

export const metadata = {
  title: 'Directorios',
};

export default async function RootLayout({
  children,
  params
}: Readonly<{
  children: React.ReactNode;
  params: any
}>) { 
  return (
    <section className="flex w-full max-w-full h-full flex-row gap-4 px-4 pb-4">
      <DirectoryTree institution={params.institution}  />
      <div className="flex shadow-md w-full max-w-full h-full rounded-lg flex-col bg-white gap-8  md:gap-0">
        <RouteDirectory institution={params.institution}/>
        {children}
      </div>
    </section>
  );
}
