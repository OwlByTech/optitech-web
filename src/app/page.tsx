import { SignOut } from "@/modules/auth/components/sign-out";
import authOptions from "./api/auth/[...nextauth]/options";
import { getServerSession } from "next-auth";
export const metadata = {
    title: "Inicio"
}


export default async function Home() {
    const session = await getServerSession(authOptions)
    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-24">
            <div className="flex flex-col gap-2">
                <p className="font-bold">{session?.user.name}</p>
                <SignOut />
            </div>

        </main>
    );
}


