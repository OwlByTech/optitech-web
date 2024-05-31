import { Inter } from "next/font/google";
import { NextUIProvider } from "@nextui-org/react";
import "../styles/index.css"
const inter = Inter({ subsets: ["latin"] });


export default async function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" className="light">
            <body className={inter.className}>
                <NextUIProvider>
                    {children}
                </NextUIProvider>
            </body>

        </html>
    );
}
