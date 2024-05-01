import { GongsilockLogo } from '@/components/GongsilockLogo/GongsilockLogo';
import Link from 'next/link';
import SendResetPasswordMailForm from './_forms/SendResetPasswordMailForm';
import { HeadingWithDescription } from '@/components/HeadingWithDescription/HeadingWithDescription';
import { redirect } from 'next/navigation';

export default function Page() {
  const handleSuccess = async (email: string) => {
    'use server';

    console.log('어 그래 성공~');

    redirect(`/reset-password/mail-sent?mail=${email}`);
  };

  return (
    <section className="full-container">
      <Link href="/login">
        <GongsilockLogo />
      </Link>

      <HeadingWithDescription
        heading="비밀번호 재설정"
        description="가입했던 메일을 통해 비밀번호를 재설정할 수 있어요."
      />

      <SendResetPasswordMailForm onSuccess={handleSuccess} />
    </section>
  );
}
