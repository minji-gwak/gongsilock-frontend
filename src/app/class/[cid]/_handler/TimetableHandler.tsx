'use client';

import {
  addDays,
  getDay,
  isSameDay,
  isSameHour,
  isSameMinute,
  isSameSecond,
  setHours,
  setMinutes,
  setSeconds,
  subDays,
} from 'date-fns';
import { useEffect } from 'react';
import { TimetableResponse } from '../_actions/actions';
import { CurrentTimeStatus, useCurrentTime } from '../_store/CurrentTimeStore';
import { Period, usePeriods } from '../_store/PeriodsStore';
import { TimetableStoreStatus, useTimetable } from '../_store/TimetableStore';
import { useFocusTime } from '../_store/FocusTimeStore';

const getResetTime = (date: Date) => setSeconds(setMinutes(setHours(date, 5), 0), 0);

export const TimetableHandler = ({ initialTimetable }: { initialTimetable: TimetableResponse }) => {
  const { status: currentTimeStatus, currentTime } = useCurrentTime();
  const { status: timetableStatus, updateTimetable } = useTimetable();
  const { resetDuration } = useFocusTime();

  const calcuatePeriods = () => {
    if (currentTimeStatus === CurrentTimeStatus.NOT_SET) {
      throw new Error("currentTimeStatus shouldn't be 'NOT_SET'");
    }

    const isOvernight = currentTime.getHours() < 5;
    const startBaseTime = isOvernight ? subDays(currentTime, 1) : currentTime;
    const currentDayOfWeek = getDay(startBaseTime);
    const hasMatchDayOfWeek = initialTimetable.dayOfWeeks.includes(currentDayOfWeek);

    if (!hasMatchDayOfWeek) {
      const fullPeriod: Period = {
        id: 0,
        name: '자습 시간',
        startTime: isOvernight ? getResetTime(subDays(currentTime, 1)) : getResetTime(currentTime),
        duration: 60 * 24,
        isAttendacneRequired: false,
      };

      return [fullPeriod];
    }

    const newPeriods = initialTimetable.periods.map((period) => {
      const hours = Number(period.startTime.split(':')[0]);
      const minutes = Number(period.startTime.split(':')[1]);

      const newStartTime = setSeconds(setMinutes(setHours(startBaseTime, hours), minutes), 0);

      const isPeriodOvernight = hours < 5;

      return {
        ...period,
        startTime: isPeriodOvernight ? addDays(newStartTime, 1) : newStartTime,
      };
    });

    return newPeriods;
  };

  useEffect(() => {
    const doneSetCurrentTime = currentTimeStatus === CurrentTimeStatus.SET_WITH_SERVER_TIME;
    const isNotInitializedTimetalbe = timetableStatus === TimetableStoreStatus.NOT_INITIALIZED;
    const shouldInitialize = doneSetCurrentTime && isNotInitializedTimetalbe;

    if (shouldInitialize) {
      const calcuatedPeriods = calcuatePeriods();

      return updateTimetable({
        ...initialTimetable,
        periods: calcuatedPeriods,
      });
    }
  }, [currentTimeStatus]);

  useEffect(() => {
    if (currentTimeStatus === CurrentTimeStatus.NOT_SET) {
      return;
    }

    if (timetableStatus === TimetableStoreStatus.NOT_INITIALIZED) {
      return;
    }

    const resetTime = getResetTime(currentTime);

    const isResetTime =
      isSameDay(currentTime, resetTime) &&
      isSameHour(currentTime, resetTime) &&
      isSameMinute(currentTime, resetTime) &&
      isSameSecond(currentTime, resetTime);

    if (isResetTime) {
      resetDuration();

      const calcuatedPeriods = calcuatePeriods();

      return updateTimetable({
        ...initialTimetable,
        periods: calcuatedPeriods,
      });
    }
  }, [currentTime]);

  return <></>;
};
