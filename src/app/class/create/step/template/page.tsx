import { HeadingWithDescription } from '@/components/HeadingWithDescription/HeadingWithDescription';
import fox from '@/static/images/fox.jpg';
import TemplateForm, { TemplateData } from '../_forms/TemplateForm';
import { redirect } from 'next/navigation';

const templateDataList: TemplateData[] = [
  {
    id: 0,
    name: '수능 시간표',
    description: '수능 시간표에 대한 설명입니다.',
    image: fox.src,
  },
  {
    id: 1,
    name: '한국사 시간표',
    description: '한국사 시간표에 대한 설명입니다.',
    image: fox.src,
  },
  {
    id: 2,
    name: '빈 시간표',
    description: '시간표를 직접 설정할게요.',
    image: fox.src,
  },
];

export default function Page() {
  const handleSuccess = async () => {
    'use server';

    redirect('/class/create/step/timetable');
  };

  return (
    <section className="flex flex-col flex-1 space-y-6">
      <HeadingWithDescription heading="기본 템플릿 선택" description="미리 정의된 시간표로 더 편하게 생성해보세요." />
      <TemplateForm list={templateDataList} onSuccess={handleSuccess} />
    </section>
  );
}
