import { HeadingWithDescription } from '@/components/HeadingWithDescription/HeadingWithDescription';
import { RequiredForm } from './RequiredForm';
import { redirect } from 'next/navigation';

export default function Page() {
  return (
    <section className="flex flex-col flex-1 space-y-6">
      <HeadingWithDescription heading="반 만들기" description="반을 만들어서 머시기 머시기 해보세요." />

      <RequiredForm
        onSuccess={async () => {
          'use server';
          redirect('/class/create/step/template');
        }}
      />
    </section>
  );
}
