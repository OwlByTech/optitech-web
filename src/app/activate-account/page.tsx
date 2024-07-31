import {SignOut} from '@/modules/auth/components/sign-out';
import StepThree from '@/modules/auth/templates/register-step-3';

export const metadata = {
  title: 'Activar cuenta',
};

export default async function Page() {
  return <StepThree />;
}
