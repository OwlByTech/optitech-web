import Principal from '@/modules/auth/templates/principal';
import {getClientInfoByTokenService} from '@/modules/dashboard/services';

export const metadata = {
  title: 'OptiTech',
};

export default async function Page() {
  const clientInfo = (await getClientInfoByTokenService()).data;

  return <Principal clientInfo={clientInfo} />;
}
