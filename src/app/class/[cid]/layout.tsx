import Link from 'next/link';
import { notFound } from 'next/navigation';
import { PropsWithChildren } from 'react';

export default function Layout({ children, params }: PropsWithChildren<{ params: { cid: string } }>) {
  // const { cid } = params;

  // if (cid !== '12321') {
  //   notFound();
  // }

  return (
    <div>
      <header>
        <Link href="./dashboard">대시보드</Link>
        <Link href="./focus">집중모드</Link>
        <Link href="./camstudy">캠스터디</Link>
      </header>
      <main>{children}</main>
    </div>
  );
}
