import { GongsilockLogo } from '@/components/GongsilockLogo/GongsilockLogo';
import { SocialLogins } from '@/components/SocialLogins/SocialLogins';
import Image from 'next/image';
import Link from 'next/link';
import fox from '../../static/images/fox.jpg';
import { LoginForm } from './_forms/LoginForm';

export default function Home() {
  return (
    <section className="flex h-dvh items-center">
      <div className="flex-1 flex flex-row rounded-xl overflow-hidden mx-auto lg:max-w-[min(100dvw-9rem,75rem)]">
        <div className="flex-1 flex flex-col gap-12 p-6">
          <GongsilockLogo />
          <LoginForm redirectUrl="/class" />
          <SocialLogins />

          <Link className="underline w-full text-center" href="/reset-password">
            비밀번호를 잊으셨나요?
          </Link>
        </div>

        <div className="flex-1 hidden lg:block">
          <Image className="w-full h-full object-cover" src={fox.src} width={1084} height={720} alt="fox" />
        </div>
      </div>
    </section>
  );
}
