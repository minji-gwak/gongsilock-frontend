import { DayOfWeekToggle, DayOfWeekToggleGroup } from '@/components/DayOfWeekToggle/DayOfWeekToggle';
import { HeadingWithDescription } from '@/components/HeadingWithDescription/HeadingWithDescription';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Clock, Info, UserRoundCheck } from 'lucide-react';

// type Period = {
//   name: string;
//   attendanceRequired: boolean;
// };

export default function Page() {
  return (
    <section className="space-y-12 text-green-900">
      <HeadingWithDescription heading="세부 설정" description="각 교시마다 세부적인 설정을 바꿀 수 있어요." />

      <div className="space-y-2">
        <p className="font-semibold text-lg">요일</p>
        <DayOfWeekToggleGroup>
          <DayOfWeekToggle value={0} />
          <DayOfWeekToggle value={1} />
          <DayOfWeekToggle value={2} />
          <DayOfWeekToggle value={3} />
          <DayOfWeekToggle value={4} />
          <DayOfWeekToggle value={5} />
          <DayOfWeekToggle value={6} />
        </DayOfWeekToggleGroup>
      </div>

      <div>
        <div className="flex flex-row gap-6">
          <div className="flex flex-col gap-1">
            <span className="font-semibold">
              교시 시간
              <Info className="size-3 inline-block align-text-top" />
            </span>
            <div className="px-3 py-2 border border-green-600 rounded w-fit">50분</div>
          </div>

          <div className="flex flex-col gap-1">
            <span className="font-semibold">
              쉬는 시간
              <Info className="size-3 inline-block align-text-top" />
            </span>
            <div className="px-3 py-2 border border-green-600 rounded w-fit">10분</div>
          </div>

          <div className="flex flex-col gap-1">
            <span className="font-semibold">
              교시 반복 횟수
              <Info className="size-3 inline-block align-text-top" />
            </span>

            <div className="flex flex-col gap-2">
              <div className="px-3 py-2 border border-green-600 rounded w-fit">8교시</div>
            </div>
          </div>
        </div>

        <span className="text-sm">
          <strong>오후 5시 00분</strong>에 시간표가 마무리됩니다.
        </span>
      </div>

      <div className="flex flex-row gap-10">
        <div className="space-y-4 flex-1">
          <div className="space-y-2">
            <p className="font-semibold text-lg">교시 목록</p>
            <span>교시를 선택하면 설정할 수 있어요.</span>
          </div>

          <ul className="space-y-2 w-full">
            <PeriodItem />
            <PeriodItem />
            <PeriodItem />
            <PeriodItem />
            <PeriodItem />
            <PeriodItem />
            <PeriodItem />
            <PeriodItem />
          </ul>
        </div>

        {/* TODO: Modal in mobile */}
        <div className="flex-1 space-y-16 hidden md:block">
          <div className="space-y-3">
            <div className="">
              <p className="font-semibold text-xl">교시 이름*</p>
              <p>해당 교시 이름을 입력해주세요.</p>
            </div>

            <Input placeholder="오전1" />
          </div>

          <div>
            <div className="space-y-2">
              <p className="font-semibold text-xl">해당 교시 출석체크 여부</p>
              <p>해당 교시에 대한 출석체크 여부를 따로 설정할 수 있어요.</p>
            </div>

            <div className="round bg-green-50 p-1 flex flex-row gap-1 w-fit">
              <button className="px-3 py-[.5rem] bg-white rounded shadow-dayOfWeek font-medium">출석체크</button>
              <button className="px-3 py-[.5rem] ">출석체크 안 함</button>
            </div>
          </div>
        </div>
      </div>

      <Button className="w-full rounded-full" asChild>
        <a href="/class/create/complete">만들기</a>
      </Button>
    </section>
  );
}

const PeriodItem = () => {
  return (
    <li className="flex flex-row rounded overflow-hidden w-full cursor-pointer hover:shadow-dayOfWeek">
      <div className="w-1 bg-green-400" />
      <div className="bg-white space-y-2 px-3 py-2 flex-1">
        <div className="flex flex-row justify-between items-end">
          <div className="flex flex-row items-center gap-1">
            <span className="font-medium">오전1</span>
            <UserRoundCheck className="size-4" />
          </div>

          <span className="text-[.875rem] text-gray-600">1교시</span>
        </div>

        <div className="flex flex-row gap-1 items-center">
          <Clock className="size-4" />
          <span>오전 9시 00분 ~ 오전 9시 50분</span>
        </div>
      </div>
    </li>
  );
};
