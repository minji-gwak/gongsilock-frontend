import { SendSignUpMailForm } from '@/app/signup/_forms/SendSignUpMailForm';
import { GongsilockLogo } from '@/components/GongsilockLogo/GongsilockLogo';
import Link from 'next/link';
import { redirect } from 'next/navigation';

export default function Page() {
  const handleSuccess = async (email: string) => {
    'use server';
    // console.log('성공!');
    redirect(`/signup/mail-sent?mail=${email}`);
  };

  return (
    <section className="flex flex-col inset-0 py-[4.5rem] px-[1.5rem] gap-8 md:max-w-[48rem] mx-auto h-dvh">
      <Link href="/login">
        <GongsilockLogo />
      </Link>

      <div className="space-y-2">
        <h1 className="text-2xl font-bold md:text-4xl">회원가입</h1>
        <p>기존의 이메일로 공시락 서비스에 가입해보세요.</p>
      </div>

      <SendSignUpMailForm onSuccess={handleSuccess} />
    </section>
  );
}
