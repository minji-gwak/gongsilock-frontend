import { getVerifiedEmailFromToken } from '@/app/actions/validate.actions';
import { GongsilockLogo } from '@/components/GongsilockLogo/GongsilockLogo';
import { HeadingWithDescription } from '@/components/HeadingWithDescription/HeadingWithDescription';
import { FetchStatus } from '@/types/api';
import Link from 'next/link';
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

  const { status, data } = await getVerifiedEmailFromToken({ token });

  if (status === FetchStatus.FAIL) {
    throw new Error(data.errorMessage);
  }

  if (status === FetchStatus.NETWORK_ERROR) {
    throw new Error(data.message);
  }

  if (status === FetchStatus.UNKNOWN_ERROR) {
    throw new Error(data);
  }

  const { email: verifiedEmail } = data;

  return (
    <section className="full-container">
      <Link href="/login">
        <GongsilockLogo />
      </Link>

      <HeadingWithDescription heading="비밀번호 재설정" description="변경할 비밀번호를 입력해주세요." />

      <ResetPasswordForm redirectURL="/reset-password/complete" defaultValues={{ email: verifiedEmail }} />
    </section>
  );
}
