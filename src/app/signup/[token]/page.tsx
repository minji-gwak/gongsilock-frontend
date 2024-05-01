import { SignUpForm } from '@/app/signup/_forms/SignUpForm';
import { GongsilockLogo } from '@/components/GongsilockLogo/GongsilockLogo';
import { HeadingWithDescription } from '@/components/HeadingWithDescription/HeadingWithDescription';
import Link from 'next/link';
import { redirect } from 'next/navigation';

type PageProps = {
  params: { token: string };
};
export default function Page({ params }: PageProps) {
  const { token } = params;

  const handleSuccess = async () => {
    'use server';
    console.log('회원가입 성공!!~~~!');

    redirect('/class');
  };

  return (
    <section className="full-container">
      <Link href="/login">
        <GongsilockLogo />
      </Link>

      <HeadingWithDescription heading="기본 정보 입력" description="공시락 서비스에 필요한 정보를 입력해주세요." />
      <SignUpForm onSuccess={handleSuccess} />
    </section>
  );
}
