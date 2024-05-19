import { GongsilockLogo } from '@/components/GongsilockLogo/GongsilockLogo';
import { HeadingWithDescription } from '@/components/HeadingWithDescription/HeadingWithDescription';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { getVerifiedEmailFromToken } from '../_actions/actions';
import ResetPasswordForm from '../_forms/ResetPasswordForm';

type PageProps = {
  params: { token?: string };
};

export default async function Page({ params }: PageProps) {
  const { token } = params;

  if (!token) {
    // never but for type-guard
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

    console.log('어 그래 성공~');

    redirect(`/reset-password/complete`);
  };

  return (
    <section className="full-container">
      <Link href="/login">
        <GongsilockLogo />
      </Link>

      <HeadingWithDescription heading="비밀번호 재설정" description="변경할 비밀번호를 입력해주세요." />

      <ResetPasswordForm onSuccess={handleSuccess} defaultValues={{ email: verifiedEmail }} />
    </section>
  );
}
