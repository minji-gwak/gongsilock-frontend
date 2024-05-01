import { Metadata } from 'next';

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { ChevronLeft } from 'lucide-react';
import { Header } from './_components/header';

export const metadata: Metadata = {
  title: '공부 시간을 나누는 즐거움, 공시락: 이메일로 회원가입',
  description: '이메일로 가입하셈',
};

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
