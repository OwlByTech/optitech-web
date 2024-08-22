import {getInstitutionByAsesorService} from '@/modules/institution/services';
import AsesorInstitution from '@/modules/institution/templates/asesor-institution';

export default async function Page() {
  const asesor = await getInstitutionByAsesorService();

  if (!Array.isArray(asesor) || asesor.length === 0) return <p>No institutions found</p>;

  return <AsesorInstitution institutions={asesor} />;
}
