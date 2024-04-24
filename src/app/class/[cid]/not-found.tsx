import Link from 'next/link';

export default async function NotFound() {
  return (
    <div>
      <h2>Not Found</h2>
      <p>이상한 classID입니다요</p>
      <Link href="/class">반 선택 목록으로 돌아가기</Link>
    </div>
  );
}
