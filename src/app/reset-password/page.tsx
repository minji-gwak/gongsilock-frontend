import { GongsilockLogo } from '@/components/GongsilockLogo/GongsilockLogo';
import { HeadingWithDescription } from '@/components/HeadingWithDescription/HeadingWithDescription';
import Link from 'next/link';
import SendResetPasswordMailForm from './_forms/SendResetPasswordMailForm';

export default function Page() {
  return (
    <section className="full-container">
      <Link href="/login">
        <GongsilockLogo />
      </Link>

      <HeadingWithDescription
        heading="비밀번호 재설정"
        description="가입했던 메일을 통해 비밀번호를 재설정할 수 있어요."
      />

      <SendResetPasswordMailForm />
    </section>
  );
}
