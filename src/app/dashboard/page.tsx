import { SignOut } from "@/modules/auth/components/sign-out";
import { clientInfoService } from "@/modules/dashboard";
export const metadata = {
    title: "Inicio"
}


export default async function Home() {
    const clientInfo = await clientInfoService();
    return (
        <main className="flex  flex-col items-center justify-between p-24">
            <div className="flex flex-col font-bold justify-center">
                <p>
                    {clientInfo.GivenName}
                </p>
                <p>
                    {clientInfo.Id}
                </p>
                <p>
                    {clientInfo.Surname}
                </p>
                <p>
                    {clientInfo.Email}
                </p>
            </div>
            <div className="flex flex-col gap-2">
                <SignOut />
            </div>

        </main>
    );
}
