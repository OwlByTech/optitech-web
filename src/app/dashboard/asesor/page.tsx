import InstitutionAsesor from "@/modules/asesor/templates/institution-asesor";
import { getClientInfoByIdService } from "@/modules/dashboard/services";
import { getInstitutionService } from "@/modules/institution/services";
import { getPhotoUserService } from "@/modules/settings/services";

export default async function Page() {
  const institution = await getInstitutionService();
  if (!institution) return <></>;
  const asesor = await getClientInfoByIdService(institution.asesorId);
  const photo = await getPhotoUserService(institution.asesorId);
  if(!asesor?.data || !photo) return <></>;
  asesor.data.photo = photo;

  return <InstitutionAsesor id={institution.id} data={asesor.data!}/>;
}

