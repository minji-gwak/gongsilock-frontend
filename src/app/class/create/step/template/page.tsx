import { HeadingWithDescription } from '@/components/HeadingWithDescription/HeadingWithDescription';

import fox from '@/static/images/fox.jpg';
import { TemplateData, TemplateList } from './TemplateList';

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
  return (
    <section className="space-y-12">
      <HeadingWithDescription heading="기본 템플릿 선택" description="미리 정의된 시간표로 더 편하게 생성해보세요." />

      <div>
        <h4 className="font-bold mb-3">템플릿 목록</h4>
        <TemplateList list={templateDataList} />
      </div>

      <a
        className="w-full py-3 rounded-full bg-green-500 block text-center font-semibold text-white"
        href="/class/create/step/timetable">
        다음
      </a>
    </section>
  );
}
