import { SignOut } from "@/modules/auth/components/sign-out";
import { clientInfoService } from "@/modules/dashboard/services";
export const metadata = {
  title: "Inicio",
};

export default async function Home() {
  const clientInfo = (await clientInfoService()).data;

  return (
    <main className="flex flex-col items-center justify-center gap-48 min-h-full">
      <div className="flex flex-col font-bold justify-center">
        <p>{clientInfo?.givenName}</p>
        <p>{clientInfo?.id}</p>
        <p>{clientInfo?.surname}</p>
        <p>{clientInfo?.email}</p>
      </div>
      <div className="flex flex-col gap-2">
        <SignOut />
      </div>
    </main>
  );
}
