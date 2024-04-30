import { DayOfWeekToggle, DayOfWeekToggleGroup } from '@/components/DayOfWeekToggle/DayOfWeekToggle';
import { TitleWithDescription } from '@/components/TitleWithDescription/TitleWithDescription';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { BoxSelect, Info } from 'lucide-react';

export default function Page() {
  const handleChange = async (dayOfWeeks) => {
    'use server';
    console.log(dayOfWeeks); // 활성화된 토글 버튼들의 값 배열
  };

  return (
    <section className="space-y-12">
      <TitleWithDescription
        title="시간표 설정"
        description="기본적인 시간표를 생성하는 데 필요한 정보를 입력해주세용"
      />

      <div className="space-y-2">
        <p className="font-semibold text-lg">시간표 이름*</p>
        <span>생성할 시간표 이름을 알려주세요.</span>
        <Input placeholder="너만 오면 바로 ㄱ" />
      </div>

      <div className="space-y-2">
        <p className="font-semibold text-lg">요일 선택*</p>
        <span>반복할 요일을 선택해주세요.</span>
        <DayOfWeekToggleGroup onChange={handleChange}>
          <DayOfWeekToggle value={0} />
          <DayOfWeekToggle value={1} />
          <DayOfWeekToggle value={2} />
          <DayOfWeekToggle value={3} />
          <DayOfWeekToggle value={4} />
          <DayOfWeekToggle value={5} />
          <DayOfWeekToggle value={6} />
        </DayOfWeekToggleGroup>
      </div>

      <div className="space-y-6">
        <div className="space-y-2">
          <p className="font-semibold text-lg">시간 설정*</p>
          <span>각 교시는 다음 단계에서 자세히 바꿀 수 있어요.</span>
        </div>

        <div className="space-y-6">
          <div className="flex flex-col gap-1 md:flex-row  md:gap-6">
            <span className="font-semibold inline-block md:w-[12.5rem] md:text-right">
              첫 교시 시작 시간
              <Info className="size-3 inline-block align-text-top" />
            </span>
            <div className="px-3 py-2 border border-green-600 rounded w-fit">오전 9시 00분</div>
          </div>

          <div className="flex flex-col gap-1 md:flex-row  md:gap-6">
            <span className="font-semibold inline-block md:w-[12.5rem] md:text-right">
              교시 시간
              <Info className="size-3 inline-block align-text-top" />
            </span>
            <div className="px-3 py-2 border border-green-600 rounded w-fit">50분</div>
          </div>

          <div className="flex flex-col gap-1 md:flex-row  md:gap-6">
            <span className="font-semibold inline-block md:w-[12.5rem] md:text-right">
              쉬는 시간
              <Info className="size-3 inline-block align-text-top" />
            </span>
            <div className="px-3 py-2 border border-green-600 rounded w-fit">10분</div>
          </div>

          <div className="flex flex-col gap-1 md:flex-row  md:gap-6">
            <span className="font-semibold inline-block md:w-[12.5rem] md:text-right">
              교시 반복 횟수
              <Info className="size-3 inline-block align-text-top" />
            </span>

            <div className="flex flex-col gap-2">
              <div className="px-3 py-2 border border-green-600 rounded w-fit">8교시</div>

              <span className="text-sm">
                <strong>오후 5시 00분</strong>에 시간표가 마무리됩니다.
              </span>
            </div>
          </div>

          <div className="flex flex-col gap-1 md:flex-row  md:gap-6">
            <span className="font-semibold inline-block md:w-[12.5rem] md:text-right">
              매 교시 출석체크 여부
              <Info className="size-3 inline-block align-text-top" />
            </span>

            <div className="round bg-green-50 p-1 flex flex-row gap-1 w-fit">
              <button className="px-3 py-[.5rem] bg-white rounded shadow-dayOfWeek font-medium">출석체크</button>
              <button className="px-3 py-[.5rem] ">출석체크 안 함</button>
            </div>
          </div>
        </div>
      </div>

      <Button className="w-full rounded-full font-medium" asChild>
        <a href="/class/create/step/timetable-detail">다음</a>
      </Button>
    </section>
  );
}
