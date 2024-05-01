import type { Metadata } from 'next';
import localFont from 'next/font/local';
import './globals.css';
import { cn } from '@/lib/utils';

const pretendard = localFont({
  src: '../static/fonts/PretendardVariable.woff2',
  display: 'swap',
  variable: '--font-pretendard',
});

export const metadata: Metadata = {
  title: '공부 시간을 나누는 즐거움, 공시락',
  description: '공시락으로 함께 공부해봐요.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className={cn(pretendard.className, '')}>
        {children}
      </body>
    </html>
  );
}
