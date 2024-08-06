import { SignOut } from '@/modules/auth/components/sign-out';
import { clientInfoService } from '@/modules/dashboard/services';
import { SideBar } from '@/modules/dashboard/templates/sidebar';
import { TopBar } from '@/modules/dashboard/templates/topbar';
import { getPhotoUserService } from '@/modules/settings/services';

export default async function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const clientInfo = (await clientInfoService()).data;

    if (!clientInfo) {
        return <SignOut />;
    }
    if (clientInfo.photo) {
        const photo = await getPhotoUserService(clientInfo.id);
        if (photo) clientInfo.photo = photo;
    }

    return (
        <section className="flex flex-row h-screen w-screen overflow-hidden">
            <SideBar clientInfo={clientInfo} />
            <div className="flex h-full w-full flex-col bg-gray-100 gap-8 md:gap-0">
                <TopBar clientInfo={clientInfo} />
                <div className="w-full max-w-full h-full rounded-md overflow-hidden">{children}</div>
            </div>
        </section>
    );
}
