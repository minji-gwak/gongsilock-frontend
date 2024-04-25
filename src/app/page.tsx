import { cookies } from 'next/headers';

export default function Home() {
  return (
    <>
      <h1>로그인을 해봅시다</h1>
      <p>{JSON.stringify(Object.fromEntries(cookies()))}</p>
      <a href="https://8d72-125-184-74-26.ngrok-free.app/login">로그인 테스트</a>
    </>
  );
}
