import LoginForm from '@/components/forms/LoginForm';
import Image from 'next/image';

import logo from '../../static/images/gongsilock-signature-bg-white.jpg';
import fox from '../../static/images/fox.jpg';
import Link from 'next/link';
import { SocialLogins } from '@/components/SocialLogins/SocialLogins';

export default function Home() {
  return (
    <section className="grid place-items-center h-dvh">
      <section className="flex flex-row w-full max-w-[62.5rem] rounded-lg overflow-hidden h-full max-h-[43.75rem]">
        <div className="py-[2rem] px-[2.625rem] flex-1 flex items-center flex-col justify-between h-full">
          <Image src={logo.src} width={339} height={92} alt="Gongsilock Logo" />
          <LoginForm />
          <Link href="/reset-password">비밀번호 잊음?</Link>
          <SocialLogins />
        </div>

        <div className="flex-1 hidden lg:block">
          <Image className="w-full h-full object-cover" src={fox.src} width={1084} height={720} alt="fox" />
        </div>
      </section>
    </section>
  );
}
