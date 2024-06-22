import { auth } from "@/auth";
import Principal from "@/modules/auth/templates/principal";
import { clientInfoService } from "@/modules/dashboard";

export const metadata = {
  title: "OptiTech",
};

export default async function Page() {
    const clientInfo = await clientInfoService();

  return <Principal clientInfo={clientInfo}/>;
}

