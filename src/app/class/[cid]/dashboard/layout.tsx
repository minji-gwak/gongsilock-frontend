import { Megaphone } from 'lucide-react';
import { ReactNode } from 'react';

export default function Layout({
  groupFocus,
  recentFocus,
  timetable,
  todayRank,
}: {
  groupFocus: ReactNode;
  recentFocus: ReactNode;
  timetable: ReactNode;
  todayRank: ReactNode;
}) {
  return (
    <section className="flex flex-col gap-3 md:gap-6">
      <div className="flex flex-row gap-2 p-3 items-start bg-green-50 rounded md:gap-6">
        <div className="flex flex-row gap-1 min-w-fit items-center">
          <Megaphone className="size-6 p-1" />
          <span className="font-semibold hidden md:block">공지사항</span>
        </div>

        <span>
          <strong>황영웅</strong>(이)가 <strong>7시간 동안 집중</strong>하는 중입니다! 미쳐날뛰고 있군요!
        </span>
      </div>

      <div className="flex flex-col md:flex-row-reverse">
        <div className="flex-1">
          {todayRank}
          {timetable}
        </div>

        <div className="flex-1">
          {recentFocus}
          {groupFocus}
        </div>
      </div>
    </section>
  );
}
