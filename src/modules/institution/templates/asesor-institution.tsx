import {LinkRef} from '@/modules/common/components/link-ref';
import {ROUTES_INSTITUTION} from '../types';
import {ROUTES_SIDEBAR} from '@/modules/dashboard/types';

export type Institution = {
  id: number;
  institutionName: string;
  logo: string;
  description: string;
  services?: any;
  asesorId: number;
  clients?: any;
  photo?: any;
};

export type AsesorInstitutionProps = {
  institutions: Institution[];
};
export default function AsesorInstitution({institutions}: AsesorInstitutionProps) {
  return (
    <div className="p-8 bg-white mx-5 mb-5 rounded-xl h-screen">
      <div className="flex gap-5 grid-cols-6">
        {institutions.map(institution => (
          <LinkRef href={`${ROUTES_SIDEBAR.INSTITUTIONS}/${institution.id}`}>
            <div
              key={institution.id}
              className="flex flex-col justify-center w-44 border-2 rounded-xl p-4 cursor-pointer"
            >
              <h2>{institution.institutionName}</h2>
              {institution.photo ? (
                <img src={institution.photo} />
              ) : (
                <img src="/profile.png" alt="Default profile" />
              )}
              <p>{institution.description}</p>
            </div>
          </LinkRef>
        ))}
      </div>
    </div>
  );
}
