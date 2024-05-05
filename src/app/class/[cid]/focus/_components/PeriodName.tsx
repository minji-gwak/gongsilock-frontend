'use client';

import { Period, PeriodStatus, usePeriods } from '../../_store/usePeriods';

export const PeriodName = () => {
  const { status: periodStatus, currentPeriod } = usePeriods();

  const periodNameLabel = getPeriodNameLabel(periodStatus, currentPeriod);
  const durationLabel = getDurationLavel(periodStatus, currentPeriod);

  return (
    <div>
      <p className="text-[2.625rem] font-bold text-green-700">{periodNameLabel}</p>
      <p className="text-lg font-semibold text-green-700 text-center">{durationLabel}</p>
    </div>
  );
};

const getPeriodNameLabel = (periodStatus: PeriodStatus, currentPeriod: Period | null) => {
  const isInPeriod = periodStatus === PeriodStatus.IN_PERIOD;

  if (isInPeriod) {
    return (currentPeriod as Period).name;
  }

  return '자습시간';
};

const getDurationLavel = (periodStatus: PeriodStatus, currentPeriod: Period | null) => {
  const isBeforeFirstClass = periodStatus === PeriodStatus.BEFORE_FIRST_PERIOD;
  const isAfterLastClass = periodStatus === PeriodStatus.AFTER_LAST_PERIOD;

  if (isBeforeFirstClass) {
    return '시간표 시작 전';
  }

  if (isAfterLastClass) {
    return '시간표 마무리 후';
  }

  if (currentPeriod === null) {
    throw new Error("currentPeriod shouldn't be null");
  }

  const hours = Math.floor((currentPeriod.duration || 0) / 60);
  const minutes = (currentPeriod.duration || 0) % 60;

  const hoursText = hours !== 0 ? `${hours}시간` : '';
  const minutesText = minutes !== 0 ? `${minutes}분` : '';

  const durationLabel = [hoursText, minutesText].join(' ').trim();

  return durationLabel;
};
