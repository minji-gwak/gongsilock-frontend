'use client';

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { Slash, ChevronLeft } from 'lucide-react';
import Link from 'next/link';

import { usePathname } from 'next/navigation';

const pathTitleMap: Record<string, string> = {
  '/signup/mail': '이메일로 회원가입',
  '/signup/mail-sent': '회원가입 메일 전송 완료',
};

export const Header = () => {
  const pathname = usePathname();
  const pathTitle = pathTitleMap[pathname];

  // return <>here is {pathname}</>;
  return (
    <header className="p-2 md:p-8">
      <Breadcrumb className="hidden md:block">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/login" className="flex flex-row items-center">
              <ChevronLeft />
              로그인 페이지로 돌아가기
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator>{'|'}</BreadcrumbSeparator>
          <BreadcrumbItem>
            <BreadcrumbPage>{pathTitle}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <Link className="md:hidden" href="/login">
        <span className="flex flex-row">
          <ChevronLeft />
          돌아가기
        </span>
      </Link>
    </header>
  );
};
