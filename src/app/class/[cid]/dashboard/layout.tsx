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
    <section>
      <p>공지사항</p>

      <div>
        {recentFocus}
        {groupFocus}
      </div>

      <div>
        {todayRank}
        {timetable}
      </div>
    </section>
  );
}
