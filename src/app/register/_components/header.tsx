'use client';

import { usePathname } from 'next/navigation';

export const Header = () => {
  const pathname = usePathname();

  return <>here is {pathname}</>;
};
