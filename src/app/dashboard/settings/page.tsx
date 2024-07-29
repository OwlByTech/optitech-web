import { getAsesorService } from "@/modules/asesor/services";
import { Asesor } from "@/modules/asesor/types";
import { ROLES } from "@/modules/auth/context/signup";
import { clientInfoService } from "@/modules/dashboard/services";
import GeneralDetails from "@/modules/settings/pages/general-details";
import { getPhotoUserService } from "@/modules/settings/services";
export const metadata = {
    title: "Detalles generales",
};

export default async function Page() {
    const clientInfo = await clientInfoService();

    if (!clientInfo) {
        return <>Not found</>;
    }
    if (clientInfo.roles[0].roleName === ROLES.ASSESOR) {
        const asesor = await getAsesorService(clientInfo?.id);
        if (asesor)
            clientInfo.asesor = asesor
    }

    if (clientInfo.photo != "") {
        const photo = await getPhotoUserService(clientInfo.id)
        if (photo)
            clientInfo.photo = photo
    }





    return <GeneralDetails clientInfo={clientInfo} />;
}
