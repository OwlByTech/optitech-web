'use client';
import Link from 'next/link';
import {route, routesSettings} from '../../types';
import {usePathname} from 'next/navigation';

type Props = {
  routes: route[];
  path: string;
};

export function RoutesSettings() {
  const path = usePathname();
  return (
    <div className="flex md:flex-col gap-2">
      {routesSettings.map(route => (
        <Link
          href={route.route}
          className={`flex p-[10px] flex-row gap-x-4 ${
            path === route.route && 'bg-gray-100'
          } items-center rounded-md `}
        >
          <span className="text-sm">{route.name}</span>
        </Link>
      ))}
    </div>
  );
}
