import { SignUpForm } from '@/app/signup/_forms/SignUpForm';
import { GongsilockLogo } from '@/components/GongsilockLogo/GongsilockLogo';
import Link from 'next/link';

type PageProps = {
  params: { token: string };
};
export default function Page({ params }: PageProps) {
  const { token } = params;

  return (
    <section className="flex flex-col inset-0 py-[4.5rem] px-[1.5rem] gap-8 md:max-w-[48rem] mx-auto h-dvh">
      <Link href="/login">
        <GongsilockLogo />
      </Link>

      <div className="space-y-2">
        <h1 className="text-2xl font-bold md:text-4xl">기본 정보 입력</h1>
        <p>공시락 서비스에 필요한 정보를 입력해주세요.</p>
      </div>

      <SignUpForm />
    </section>
  );
}
