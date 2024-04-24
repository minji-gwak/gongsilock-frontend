import { useParams } from 'next/navigation';

export default function Page() {
  const { token } = useParams<{ token: string }>();

  return <div>{token}</div>;
}
