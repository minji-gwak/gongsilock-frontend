import { getVerifiedEmailFromToken } from '@/app/actions/validate.actions';
import { SignUpForm } from '@/app/signup/_forms/SignUpForm';
import { GongsilockLogo } from '@/components/GongsilockLogo/GongsilockLogo';
import { HeadingWithDescription } from '@/components/HeadingWithDescription/HeadingWithDescription';
import { FetchStatus } from '@/types/api';
import Link from 'next/link';

type PageProps = {
  params: { token: string };
};
export default async function Page({ params }: PageProps) {
  const { token } = params;

  if (!token) {
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

      <HeadingWithDescription heading="기본 정보 입력" description="공시락 서비스에 필요한 정보를 입력해주세요." />
      <SignUpForm redirectURL="/class" defaultValues={{ email: verifiedEmail }} token={token} />
    </section>
  );
}
