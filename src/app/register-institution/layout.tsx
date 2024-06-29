import { InstitutionProvider } from "@/modules/institution/context";


export default async function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <InstitutionProvider>
            {children}
        </InstitutionProvider>

    );
}
