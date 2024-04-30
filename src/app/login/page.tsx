import { SocialLogins } from '@/components/SocialLogins/SocialLogins';
import Image from 'next/image';
import Link from 'next/link';
import fox from '../../static/images/fox.jpg';
import { LoginForm } from './_forms/LoginForm';
import { redirect } from 'next/navigation';
import { GongsilockLogo } from '@/components/GongsilockLogo/GongsilockLogo';

export default function Home() {
  const handleSuccess = async () => {
    'use server';

    console.log('성공성공~');
    redirect('/class');
  };

  return (
    <section className="grid place-items-center h-dvh w-dvw">
      <section className="flex flex-row w-full h-full rounded-lg justify-center items-center max-w-[min(calc(100dvw-4.5rem),75rem)] min-h-max max-h-[calc(100dvh-9rem)]">
        <div className="flex-1 flex items-center flex-col space-y-12 lg:pr-10">
          <GongsilockLogo />
          <LoginForm onSuccess={handleSuccess} />
          <SocialLogins />
          <Link className="underline w-full text-center" href="/reset-password">
            비밀번호를 잊으셨나요?
          </Link>
        </div>

        <div className="flex-1 h-full hidden lg:block">
          <Image className="w-full h-full object-cover" src={fox.src} width={1084} height={720} alt="fox" />
        </div>
      </section>
    </section>
  );
}
