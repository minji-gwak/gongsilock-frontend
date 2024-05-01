'use client';

import { cn } from '@/lib/utils';
import { Camera, Home, Timer } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ReactNode } from 'react';
import { motion } from 'framer-motion';

type NavigationRoute = {
  path: string;
  name: string;
  icon: ReactNode;
};

const navigationRoutes: NavigationRoute[] = [
  { path: '/dashboard', name: '대시보드', icon: <Home className="size-4 md:size-5" /> },
  { path: '/focus', name: '집중모드', icon: <Timer className="size-4 md:size-5" /> },
  { path: '/camstudy', name: '캠스터디', icon: <Camera className="size-4 md:size-5" /> },
];

export const NavigationTabs = () => {
  const pathname = usePathname().split('?', 2)[0];

  return (
    <nav className="flex flex-row relative pb-3 pointer-events-none md:pb-6 md:gap-2 lg:justify-center">
      {navigationRoutes.map((navigationRoute) => (
        <NavigationTab
          key={navigationRoute.path}
          isActive={pathname.endsWith(navigationRoute.path)}
          {...navigationRoute}
        />
      ))}
      <EmphasisBarBackground />
    </nav>
  );
};

type NavigationTabProps = { isActive: boolean } & NavigationRoute;

const NavigationTab = ({ path, name, icon, isActive }: NavigationTabProps) => {
  return (
    <Link
      className={cn(
        'flex flex-row gap-2 items-center px-4 py-3 rounded font-semibold transition-colors relative pointer-events-auto',
        {
          ['bg-green-50 text-green-700']: isActive,
        }
      )}
      href={`.${path}`}>
      {icon}
      <span className="text-base md:text-xl">{name}</span>
      {isActive && <EmphasisBar />}
    </Link>
  );
};

const EmphasisBar = () => {
  return (
    <motion.div
      layoutId="emhasisbar"
      className="absolute left-0 -bottom-[.9375rem] h-[.1875rem] rounded-bl-lg rounded-br-lg w-full bg-green-700 md:-bottom-[1.6875rem]"
    />
  );
};

const EmphasisBarBackground = () => {
  return (
    <div className="absolute -left-3 -bottom-0 h-[.0625rem] rounded-bl-lg rounded-br-lg w-dvw bg-gray-200 md:-left-6" />
  );
};
