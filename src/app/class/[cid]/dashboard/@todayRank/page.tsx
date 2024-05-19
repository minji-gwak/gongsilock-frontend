import { Suspense } from 'react';
import { SectionCard } from '../_components/SectionCard';
import { FocusRandking } from './_components/FocusRanking';

export default function Page() {
  return (
    <SectionCard title="오늘의 집중 랭킹" description="오늘 나는 몇 위일까요? 집중 랭킹을 통해 알아보세요.">
      <Suspense fallback={<div>Loading ...</div>}>
        <FocusRandking />
      </Suspense>
    </SectionCard>
  );
}
