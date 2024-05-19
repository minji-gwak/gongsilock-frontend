import { SignUpForm } from '@/app/signup/_forms/SignUpForm';
import { GongsilockLogo } from '@/components/GongsilockLogo/GongsilockLogo';
import { HeadingWithDescription } from '@/components/HeadingWithDescription/HeadingWithDescription';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { getVerifiedEmailFromToken } from '../_actions/actions';

type PageProps = {
  params: { token: string };
};
export default async function Page({ params }: PageProps) {
  const { token } = params;

  if (!token) {
    throw new Error('token이 없음');
  }

  const { status, payload } = await getVerifiedEmailFromToken(token);

  // TODO: 500 상태 Enum으로 작성, status 비교하는 타입 가드 함수 작성
  if (status === 500) {
    throw new Error(JSON.stringify(payload));
  }

  const { email: verifiedEmail } = payload;

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
      <SignUpForm onSuccess={handleSuccess} defaultValues={{ email: verifiedEmail }} />
    </section>
  );
}
