'use client';

import { useEffect } from 'react';
import { CurrentTimeStatus, useCurrentTime } from '../_store/useCurrentTime';
import { Period, PeriodStatus, usePeriods } from '../_store/usePeriods';
import {
  addDays,
  addMinutes,
  isSameDay,
  isSameHour,
  isSameMinute,
  setHours,
  setMilliseconds,
  setMinutes,
  setSeconds,
} from 'date-fns';
import { useFocusAction } from '../_store/useFocusAction';

export const PeriodHandler = ({ initialPeriods }: { initialPeriods: Period[] }) => {
  const { status: currentTimeStatus, currentTime } = useCurrentTime();
  const { periods, updatePeriod, setPeriods } = usePeriods();
  const { resetDuration } = useFocusAction();

  useEffect(() => {
    setPeriods(initialPeriods);
  }, [initialPeriods]);

  useEffect(() => {
    if (currentTimeStatus === CurrentTimeStatus.NOT_SET) {
      return;
    }

    /** 새벽 5시 체크 */
    const resetTime = setSeconds(setMinutes(setHours(currentTime, 5), 0), 0);

    const isSameDays = isSameDay(resetTime, currentTime);
    const isSameHours = isSameHour(resetTime, currentTime);
    const isSameMinutes = isSameMinute(resetTime, currentTime);

    const isSameTime = isSameDays && isSameMinutes && isSameHours;

    if (isSameDays && isSameTime) {
      resetDuration();
      return setPeriods(
        periods.map((period) => ({
          ...period,
          startTime: addDays(period.startTime, 1),
        }))
      );
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

const getCurrentPeriod = (priods: Period[], currentTime: Date) => {
  // (1) 시간표 시작 전인지 확인
  const firstPeriod = priods[0];
  const isBeforeFirstPeriod = currentTime.getTime() < firstPeriod.startTime.getTime();

  if (isBeforeFirstPeriod) {
    return PeriodStatus.BEFORE_FIRST_PERIOD;
  }

  // (2) 시간표 종료 후인지 확인
  const lastPeriod = priods.at(-1)!;
  const isAfterLastPeriod = currentTime.getTime() > addMinutes(lastPeriod.startTime, lastPeriod.duration - 1).getTime();

  if (isAfterLastPeriod) {
    return PeriodStatus.AFTER_LAST_PERIOD;
  }

  // (3) 시간표 시간 확인
  const matchPeriod = priods
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
