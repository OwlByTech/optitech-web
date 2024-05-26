import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { NextUIProvider } from "@nextui-org/react";
import "../styles/index.css"
import SessionProvider from "../modules/auth//templates/AuthProvider";
import authOptions from "./api/auth/[...nextauth]/options";
import { getServerSession } from "next-auth";
const inter = Inter({ subsets: ["latin"] });


export default async function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const session = await getServerSession(authOptions)
    return (
        <html lang="en" className="light">
            <body className={inter.className}>
                <SessionProvider session={session} refetchInterval={120} >
                    <NextUIProvider>
                        {children}
                    </NextUIProvider>
                </SessionProvider>
            </body>

        </html>
    );
}
