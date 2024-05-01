import { GongsilockLogo } from '@/components/GongsilockLogo/GongsilockLogo';
import Link from 'next/link';
import ResetPasswordForm from '../_forms/ResetPasswordForm';
import { HeadingWithDescription } from '@/components/HeadingWithDescription/HeadingWithDescription';
import { redirect } from 'next/navigation';

export default function Page() {
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

      <ResetPasswordForm onSuccess={handleSuccess} />
    </section>
  );
}
