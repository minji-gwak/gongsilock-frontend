'use client';

import { addMinutes } from 'date-fns';
import { useEffect } from 'react';
import { CurrentTimeStatus, useCurrentTime } from '../_store/CurrentTimeStore';
import { Period, PeriodStatus, usePeriods } from '../_store/PeriodsStore';
import { TimetableStoreStatus, useTimetable } from '../_store/TimetableStore';
import { useFocusTime } from '../_store/FocusTimeStore';

export const PeriodHandler = () => {
  const { status: currentTimeStatus, currentTime } = useCurrentTime();
  const { status: timetableStatus, timetable } = useTimetable();
  const { status: periodsStatus, periods, updatePeriod, initializePeriodsStore } = usePeriods();
  const { resetDuration } = useFocusTime();

  useEffect(() => {
    if (timetableStatus === TimetableStoreStatus.NOT_INITIALIZED) {
      return;
    }

    if (currentTimeStatus === CurrentTimeStatus.NOT_SET) {
      throw new Error("currentTimeStatus should be 'SET_WITH_SERVER_TIME' but it's 'NOT_SET'");
    }

    const result = getCurrentPeriod(timetable.periods, currentTime);

    const isBeforeFirstPeriod = result === PeriodStatus.BEFORE_FIRST_PERIOD;
    const isAfterLastPeriod = result === PeriodStatus.AFTER_LAST_PERIOD;
    const isInPeriod = !(isBeforeFirstPeriod || isAfterLastPeriod);

    if (isBeforeFirstPeriod) {
      initializePeriodsStore(timetable.periods, PeriodStatus.BEFORE_FIRST_PERIOD, null);
    }

    if (isAfterLastPeriod) {
      initializePeriodsStore(timetable.periods, PeriodStatus.AFTER_LAST_PERIOD, null);
    }

    if (isInPeriod) {
      initializePeriodsStore(timetable.periods, PeriodStatus.IN_PERIOD, result);
    }
  }, [timetable]);

  useEffect(() => {
    if (currentTimeStatus === CurrentTimeStatus.NOT_SET) {
      return;
    }

    if (timetableStatus === TimetableStoreStatus.NOT_INITIALIZED) {
      return;
    }

    if (periodsStatus === PeriodStatus.NOT_PERIODS_SET) {
      return;
    }

    const result = getCurrentPeriod(periods, currentTime);

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
const getCurrentPeriod = (periods: Period[], currentTime: Date) => {
  // (1) 시간표 시작 전인지 확인
  const firstPeriod = periods[0];
  const isBeforeFirstPeriod = currentTime.getTime() < firstPeriod.startTime.getTime();

  if (isBeforeFirstPeriod) {
    return PeriodStatus.BEFORE_FIRST_PERIOD;
  }

  // (2) 시간표 종료 후인지 확인
  const lastPeriod = periods.at(-1)!;
  const isAfterLastPeriod = currentTime.getTime() > addMinutes(lastPeriod.startTime, lastPeriod.duration - 1).getTime();

  if (isAfterLastPeriod) {
    return PeriodStatus.AFTER_LAST_PERIOD;
  }

  // (3) 시간표 시간 확인
  const matchPeriod = periods
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
