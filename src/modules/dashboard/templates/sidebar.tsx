import {Profile} from '../components/profile';
import {ClientInfoRes} from '../types';
import {Routes} from './routes';

type SideBarProps = {
  clientInfo: ClientInfoRes;
};
export function SideBar(props: SideBarProps) {
  return (
    <div className="hidden w-[300px] md:flex h-full flex-col pt-8 px-4">
      <Profile clientInfo={props.clientInfo} />
      <Routes clientInfo={props.clientInfo} />
    </div>
  );
}
