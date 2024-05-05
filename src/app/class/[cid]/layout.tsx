import { ChevronDown, School, Settings } from 'lucide-react';
import { PropsWithChildren } from 'react';
import { NavigationTabs } from './_components/NavigationTabs';
import { TimeHandler } from './_handler/TimeHandler';
import { PeriodHandler } from './_handler/PeriodHandler';

const requestEchoAPI = <T,>(result: T) => {
  return new Promise<T>((resolve) => {
    const timerId = setTimeout(() => {
      resolve(result);
      clearTimeout(timerId);
    }, 1500);
  });
};

const _timetable = [
  { id: 0, name: '오전1', startTime: new Date('2024-05-04 13:00:00'), duration: 50, isAttendacneRequired: false },
  { id: 1, name: '쉬는 시간', startTime: new Date('2024-05-04 13:50:00'), duration: 10, isAttendacneRequired: false },
  { id: 2, name: '오전2', startTime: new Date('2024-05-04 14:00:00'), duration: 50, isAttendacneRequired: false },
  { id: 3, name: '쉬는 시간', startTime: new Date('2024-05-04 14:50:00'), duration: 10, isAttendacneRequired: false },
];

export default async function Layout({ children, params }: PropsWithChildren<{ params: { cid: string } }>) {
  // const { cid } = params;

  // if (cid !== '12321') {
  //   notFound();
  // }
  const getServerTime = async () => requestEchoAPI(new Date('2024-05-04 12:45:00'));
  const getTimetable = async () => requestEchoAPI(_timetable);

  const serverTime = await getServerTime();
  const timetable = await getTimetable();

  return (
    <>
      <section>
        <div className="relative p-3 pb-0 md:p-6 md:pb-0">
          <div className="flex flex-row justify-between lg:absolute mb-3 md:mb-6 lg:mb-0 lg:w-[calc(100%-3rem)]">
            <div className="flex flex-row gap-2 p-2 items-center ">
              <span className="text-xl font-semibold">😇</span>
              <span className="text-xl font-semibold">생기발랄한 우리반</span>
              <ChevronDown className="size-5" />
            </div>

            <div className="flex flex-row">
              <button className="flex flex-row gap-2 items-center px-4 py-3">
                <School className="size-5" />
                <span className="text-xl font-semibold hidden md:block">반 정보</span>
              </button>

              <button className="flex flex-row gap-2 items-center px-4 py-3">
                <Settings className="size-5" />
                <span className="text-xl font-semibold hidden md:block">설정</span>
              </button>
            </div>
          </div>

          <NavigationTabs />
        </div>

        <main className="p-3 md:p-6">{children}</main>
      </section>

      <TimeHandler serverTime={serverTime} />
      <PeriodHandler timetable={timetable} />
    </>
  );
}
