'use client';

import { useEffect } from 'react';
import { CurrentTimeStatus, useCurrentTime } from '../_store/useCurrentTime';
import { Period, PeriodStatus, usePeriods } from '../_store/usePeriods';
import { addMinutes } from 'date-fns';

export const PeriodHandler = ({ timetable }: { timetable: Period[] }) => {
  const { status: currentTimeStatus, currentTime } = useCurrentTime();
  const { updatePeriod, setPeriods } = usePeriods();

  useEffect(() => {
    setPeriods(timetable);
  }, [timetable]);

  useEffect(() => {
    if (currentTimeStatus === CurrentTimeStatus.NOT_SET) {
      return;
    }

    const result = getCurrentPeriod(timetable, currentTime);

    const isBeforeFirstPeriod = result === PeriodStatus.BEFORE_FIRST_PERIOD;
    const isAfterLastPeriod = result === PeriodStatus.AFTER_LAST_PERIOD;
    const isInPeriod = !(isBeforeFirstPeriod || isAfterLastPeriod);

    if (isBeforeFirstPeriod) {
      updatePeriod(null, PeriodStatus.BEFORE_FIRST_PERIOD);
    }

    if (isAfterLastPeriod) {
      updatePeriod(null, PeriodStatus.AFTER_LAST_PERIOD);
    }

    if (isInPeriod) {
      updatePeriod(result, PeriodStatus.IN_PERIOD);
    }
  }, [currentTime]);

  return <></>;
};

// 현재 교시에 대한 정보 반환
// -1 - 시간표 전, 99 - 시간표 후
// 0 ~ 98: (n + 1) 교시, (0 -> 1교시, 1 -> 2교시)
const getCurrentPeriod = (timetable: Period[], currentTime: Date) => {
  // (1) 시간표 시작 전인지 확인
  const firstPeriod = timetable[0];
  const isBeforeFirstPeriod = currentTime.getTime() < firstPeriod.startTime.getTime();

  if (isBeforeFirstPeriod) {
    return PeriodStatus.BEFORE_FIRST_PERIOD;
  }

  // (2) 시간표 종료 후인지 확인
  const lastPeriod = timetable.at(-1)!;
  const isAfterLastPeriod = currentTime.getTime() > addMinutes(lastPeriod.startTime, lastPeriod.duration - 1).getTime();

  if (isAfterLastPeriod) {
    return PeriodStatus.AFTER_LAST_PERIOD;
  }

  // (3) 시간표 시간 확인
  const matchPeriod = timetable
    .filter((period) => {
      const isOverStartTime = period.startTime.getTime() <= currentTime.getTime();
      const isUnderEndTime = currentTime.getTime() < addMinutes(period.startTime, period.duration).getTime();
      const isInPeriod = isOverStartTime && isUnderEndTime;

      return isInPeriod;
    })
    .at(0)!;

  // matchPeriod가 []인 경우는 never

  return matchPeriod;
};
