'use client';

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <div className="grid w-full h-dvh place-items-center">
      <div>
        <h4 className="text-2xl font-bold md:text-3xl">오류 🚨</h4>
        <p className="mt-2 text-center">{error.message}</p>
        <button onClick={() => reset()}>재시도하기</button>
      </div>
    </div>
  );
}
