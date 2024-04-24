import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { Slash, ChevronLeft } from 'lucide-react';

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
              <BreadcrumbPage>이메일로 회원가입</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </header>

      {children}
    </>
  );
}
