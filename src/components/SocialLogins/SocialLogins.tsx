import Link from 'next/link';

import googleIcon from '@/static/icons/devicon_google.svg';
import kakaoIcon from '@/static/icons/kakao_icon.svg';
import { Mail } from 'lucide-react';
import Image from 'next/image';

export const SocialLogins = () => {
  return (
    <div className="flex flex-col w-full gap-3">
      <button className="w-full rounded-full bg-white flex flex-row items-center justify-center gap-1 font-medium py-3 focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2 outline-none">
        <Image src={googleIcon} width={18} height={18} alt="google" />
        구글 계정으로 로그인하기
      </button>

      <button className="w-full rounded-full bg-[#FFEB3B] flex flex-row items-center justify-center gap-1 font-medium py-3 focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2 outline-none">
        <Image src={kakaoIcon} width={18} height={18} alt="kakao" />
        카카오 계정으로 로그인하기
      </button>

      <Link
        href="/signup/mail"
        className="w-full rounded-full bg-green-50 flex flex-row items-center justify-center gap-1 font-medium py-3 focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2 outline-none">
        <Mail className="size-4" />
        기존 이메일로 가입하기
      </Link>
    </div>
  );
};
