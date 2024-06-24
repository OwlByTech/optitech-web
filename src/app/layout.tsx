import { Inter } from "next/font/google";
import { NextUIProvider } from "@nextui-org/react";
import "../styles/index.css"
import { SessionProvider } from "next-auth/react";
import { auth } from "@/auth";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from "react-toastify";
const inter = Inter({ subsets: ["latin"] });


export default async function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const session = await auth()
    return (
        <html lang="en" className="light">
            <body className={inter.className}>
                <SessionProvider basePath={"/"} session={session}>
                    <NextUIProvider>
                        {children}
                    </NextUIProvider>
                    <ToastContainer />
                </SessionProvider>
            </body>

        </html>
    );
}
