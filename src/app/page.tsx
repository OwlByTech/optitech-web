import { SignOut } from "@/modules/auth/components/sign-out";
export const metadata = {
    title: "Inicio"
}


export default async function Home() {
    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-24">
            <div className="flex flex-col gap-2">
                <SignOut />
            </div>

        </main>
    );
}


