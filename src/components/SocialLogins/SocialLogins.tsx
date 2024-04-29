import Link from 'next/link';
import { Button } from '../ui/button';

export const SocialLogins = () => {
  return (
    <div className="flex flex-col w-full gap-1">
      <Button className="w-full rounded-full">구글</Button>
      <Button className="w-full rounded-full">카카오</Button>
      <Button className="w-full rounded-full" asChild>
        <Link href="/signup/mail">이메일 회원가입</Link>
      </Button>
    </div>
  );
};
