
import { auth } from "@/auth";
import { SignOut } from "@/modules/auth/components/sign-out";
export const metadata = {
    title: "Inicio"
}


export default async function Home() {
    const session = await auth()
    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-24">
            <div className="flex flex-col font-bold justify-center">
                <p>
                    {session?.user.name}
                </p>
                <p>
                    {session?.user.email}
                </p>
            </div>
            <div className="flex flex-col gap-2">
                <SignOut />
            </div>

        </main>
    );
}


