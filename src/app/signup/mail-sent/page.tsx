import Image from 'next/image';

import logo from '@/static/images/gongsilock-signature-bg-white.jpg';
import fox from '@/static/images/fox.jpg';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { GongsilockLogo } from '@/components/GongsilockLogo/GongsilockLogo';

export default function Page({ searchParams }: { searchParams?: { mail: string } }) {
  if (searchParams === undefined) {
    notFound();
  }

  const { mail } = searchParams;

  console.log({ searchParams });

  return (
    // <section className="grid place-items-center">
    <section className="flex flex-col inset-0 py-[4.5rem] px-[1.5rem] gap-8 md:max-w-[48rem] mx-auto h-dvh">
      <Link href="/login">
        <GongsilockLogo />
      </Link>
      <div className="flex flex-col gap-6 rounded-lg overflow-hidden items-center h-full">
        <Image className="w-full aspect-[3/1] object-cover" src={fox.src} width={1084} height={720} alt="fox" />
        <h1 className="text-2xl font-bold">회원가입 메일을 보냈습니다.</h1>
        <p className="text-center">
          <strong>{mail}</strong>으로 회원가입 메일을 보냈어요! <br />
          메일을 확인해주세요.
        </p>

        <div className="w-full h-full flex flex-col justify-end">
          <Button className="w-full" asChild>
            <Link href={'/login'}>로그인 페이지로 돌아가기</Link>
          </Button>
        </div>
      </div>
      {/* </section> */}
    </section>
  );
}
