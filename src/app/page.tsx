import Principal from "@/modules/auth/templates/principal";
import { clientInfoService } from "@/modules/dashboard/services";

export const metadata = {
  title: "OptiTech",
};

export default async function Page() {
  const clientInfo = (await clientInfoService()).data;

  return <Principal clientInfo={clientInfo} />;
}