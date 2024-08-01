import {Settings} from '@/modules/settings/components/settings';

export default function Page({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <Settings>{children}</Settings>;
}
