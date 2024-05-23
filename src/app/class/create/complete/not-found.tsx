import { GongsilockLogo } from '@/components/GongsilockLogo/GongsilockLogo';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';

import fox from '@/static/images/fox.jpg';

export default async function NotFound() {
  return (
    <section className="full-container">
      <Link href="/login">
        <GongsilockLogo />
      </Link>

      <div className="flex-1 flex flex-col gap-6 rounded-lg overflow-hidden items-center">
        <Image className="w-full aspect-[3/1] object-cover" src={fox.src} width={1084} height={720} alt="fox" />
        <h1 className="text-2xl font-bold">알 수 없는 경로로 들어왔어요.</h1>
        <p className="text-center">서비스 로직상 접근할 수 없는 경로로 접근했어요. 경로를 확인해보세요!</p>

        <div className="w-full flex-1 flex flex-col justify-end">
          <Button className="w-full" asChild>
            <Link href={'/login'}>로그인 페이지로 돌아가기</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
