import { clientInfoService } from "@/modules/dashboard/services";
import GeneralDetails from "@/modules/settings/pages/general-details";

export default async function Page() {
  const clientInfo = await clientInfoService();

  if (!clientInfo) {
    return <>Not found</>;
  }

  return <GeneralDetails clientInfo={clientInfo} />;
}
