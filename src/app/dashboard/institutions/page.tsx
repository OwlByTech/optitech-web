import {
  getClientByInstitutionService,
  getInstitutionByAsesorService,
} from '@/modules/institution/services';
import AsesorInstitution from '@/modules/institution/templates/asesor-institution';
import {getPhotoUserService} from '@/modules/settings/services';

export default async function Page() {
  const asesor = await getInstitutionByAsesorService();

  if (!Array.isArray(asesor) || asesor.length === 0) return <p>No institutions found</p>;

  const institutionsWithPhotos = await Promise.all(
    asesor.map(async institution => {
      const client = await getClientByInstitutionService(institution.id);

      if (client === null) {
        return {...institution, photo: null};
      }

      const photo = await getPhotoUserService(client);
      return {...institution, photo};
    })
  );

  return <AsesorInstitution institutions={institutionsWithPhotos} />;
}
