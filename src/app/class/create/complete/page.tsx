import Image from 'next/image';

import { GongsilockLogo } from '@/components/GongsilockLogo/GongsilockLogo';
import { Button } from '@/components/ui/button';
import fox from '@/static/images/fox.jpg';
import Link from 'next/link';
import { notFound } from 'next/navigation';

export default function Page({ searchParams }: { searchParams: { clazzId?: string } }) {
  const { clazzId } = searchParams;

  if (clazzId === undefined) {
    return notFound();
  }

  return (
    // <section className="grid place-items-center">
    <section className="py-[4.5rem] px-6 w-full max-w-[48rem] mx-auto space-y-12 min-h-dvh flex flex-col">
      <Link href="/login">
        <GongsilockLogo />
      </Link>

      <div className="flex flex-col gap-6 rounded-lg overflow-hidden items-center flex-1">
        <Image className="w-full aspect-[3/1] object-cover" src={fox.src} width={1084} height={720} alt="fox" />
        <h1 className="text-2xl font-bold">반 생성 완료</h1>
        <p className="text-center">이제 공부 시간을 나누는 즐거움을 누릴 수 있어요!</p>

        <div className="w-full">
          <h4 className="font-bold text-lg">반 가입 링크</h4>
          <p>이 주소를 공유해서 멤버를 초대해보세용</p>
          <div>
            <p className="text-xl">{`http://localhost:3000/class/${clazzId}/signup`}</p>
          </div>
        </div>

        <div className="w-full flex-1 flex flex-col justify-end">
          <Button className="w-full" asChild>
            <Link href={`/class/${clazzId}/dashboard`}>우리 반으로 가기</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
