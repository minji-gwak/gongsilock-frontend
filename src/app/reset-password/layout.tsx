import { Metadata } from 'next';

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { Slash, ChevronLeft } from 'lucide-react';

export const metadata: Metadata = {
  title: '공부 시간을 나누는 즐거움, 공시락: 이메일로 회원가입',
  description: '이메일로 가입하셈',
};

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <header className="p-3 md:p-8">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/login" className="flex flex-row items-center">
                <ChevronLeft />
                로그인 페이지로 돌아가기
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator>{'|'}</BreadcrumbSeparator>
            <BreadcrumbItem>
              <BreadcrumbPage>비밀번호 재설정</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </header>

      {children}
    </>
  );
}
