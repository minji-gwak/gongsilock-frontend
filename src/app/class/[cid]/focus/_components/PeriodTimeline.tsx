'use client';

import { cn } from '@/lib/utils';
import {
  addDays,
  addMinutes,
  differenceInMinutes,
  format,
  getMinutes,
  setHours,
  setMinutes,
  setSeconds,
  subMinutes,
} from 'date-fns';
import { ko } from 'date-fns/locale';
import { useEffect, useRef, useState } from 'react';
import { CurrentTimeStatus, useCurrentTime } from '../../_store/useCurrentTime';
import { Period, PeriodStatus, usePeriods } from '../../_store/usePeriods';

/**
 * Note: PeriodTimeline은 현재 교시에 따라 타임라인을 보여줍니다.
 * 현재 교시를 알기 위해선 CurrentTime이 필수이므로, CurrentTime이 설정되기 전까진 Loading UI를 보여줍니다.
 *
 * 반응형에 따라 각 라벨의 표기가 바뀝니다.
 * 어떤 반응형인지 구분하기 위해 window의 innerWidth를 비교하는 JS를 사용했으나,
 * 미디어에 따라 CSS Variable을 두고 알아낼지,
 * 미디어에 따라 객체를 바꿔줄지 고민 중
 *    Ex.)
 *      {isMobile && <MobildLabel />}
 *      {isOverMobile && <DefaultLabel />}
 *
 * 따라오는 자식 컴포넌트와 헬퍼 함수가 많아서 아마 따로 폴더로 관리해야 할 듯 싶음.
 */

enum LabelType {
  SHORT,
  LONG,
}

const getDurationLabel = (dateA: Date, dateB: Date, labelType: LabelType = LabelType.SHORT) => {
  const duration = differenceInMinutes(dateA, dateB);

  const hours = Math.floor(duration / 60);
  const minutes = duration % 60;

  const isLongType = labelType === LabelType.LONG;

  const hoursText = `${hours}${isLongType ? '시간' : 'H'}`;
  const minutesText = `${minutes}${isLongType ? '분' : 'M'}`;

  return [hours !== 0 ? hoursText : '', minutes !== 0 ? minutesText : ''].join(' ');
};

const getTimeRatio = (startDate: Date, currentDate: Date, endDate: Date) => {
  const total = +endDate - +startDate;
  const current = +currentDate - +startDate;

  return current / total;
};

const getTimeLabel = (time: Date, labelType: LabelType = LabelType.SHORT) => {
  const isLongType = labelType === LabelType.LONG;

  return format(time, isLongType ? 'aa h시 mm분' : 'HH:mm', { locale: ko });
};

const getNextDayAtFiveAM = (date: Date) => {
  let nextDay = addDays(date, 1);

  nextDay = setHours(nextDay, 5);
  nextDay = setMinutes(nextDay, 0);
  nextDay = setSeconds(nextDay, 0);

  return nextDay;
};

const getStartAndEndTime = ({
  periods,
  currentPeriod,
  periodStatus,
  currentTime,
}: {
  periods: Period[];
  currentPeriod: Period | null;
  periodStatus: PeriodStatus;
  currentTime: Date;
}) => {
  const isBeforeFirstClass = periodStatus === PeriodStatus.BEFORE_FIRST_PERIOD;
  const isAfterLastClass = periodStatus === PeriodStatus.AFTER_LAST_PERIOD;
  const isInPeriod = periodStatus === PeriodStatus.IN_PERIOD;

  let startTime: Date = new Date();
  let endTime: Date = new Date();

  if (isBeforeFirstClass) {
    startTime = subMinutes(currentTime, getMinutes(currentTime));
    endTime = periods[0].startTime;
  }

  if (isAfterLastClass) {
    const lastPeriod = periods.at(-1)!;

    startTime = addMinutes(lastPeriod.startTime, lastPeriod.duration);
    endTime = getNextDayAtFiveAM(startTime);
  }

  if (isInPeriod) {
    startTime = currentPeriod!.startTime;
    endTime = addMinutes(currentPeriod!.startTime, currentPeriod!.duration);
  }

  return { startTime, endTime };
};

export const PeriodTimeline = () => {
  const { status: currentTimeStatus } = useCurrentTime();

  const hasNoCurrentTime = currentTimeStatus === CurrentTimeStatus.NOT_SET;

  if (hasNoCurrentTime) {
    return (
      <div className="flex-1">
        <PeriodTimelineLoading />
      </div>
    );
  }
  return <AwaitedPeriodTimeline />;
};

const PeriodTimelineLoading = () => {
  return <div className="h-4 animate-pulse bg-gray-200 rounded m-4" />;
};

const AwaitedPeriodTimeline = () => {
  const { status: periodStatus, periods, currentPeriod } = usePeriods();
  const { status: currentTimeStatus, currentTime } = useCurrentTime();

  if (currentTimeStatus === CurrentTimeStatus.NOT_SET) {
    throw new Error("currentTimeStatus shouldn't be 'NOT_SET' at this point");
  }

  const { startTime, endTime } = getStartAndEndTime({
    periods,
    currentPeriod,
    periodStatus,
    currentTime,
  });

  const [isOverMobileSize, setIsOverMobileSize] = useState(
    () => typeof window === 'object' && window.innerWidth >= 768
  );
  const labelType = isOverMobileSize ? LabelType.LONG : LabelType.SHORT;

  /**
   * 현재 시각을 기준으로 ratio 비율이 증가
   * ratio를 가지고 [현재 시간, 현재 시각, 남은 시간]의 위치를 표시함.
   */
  const timeRatio = getTimeRatio(startTime, currentTime, endTime);

  /** 시간(현재 시간, 남은 시간) 표시 문구 */
  const currentDurationLabel = getDurationLabel(currentTime, startTime, labelType);
  const remainDurationLabel = getDurationLabel(endTime, currentTime, labelType);

  /** 시각(시작, 현재, 종료 시각) 표시 문구 */
  const curremtTimeLabel = getTimeLabel(currentTime, labelType);
  const startTimeLabel = getTimeLabel(startTime, labelType);
  const endTimeLabel = getTimeLabel(endTime, labelType);

  /**
   * dashed 라인의 크기 보정용
   * 되도록 CSS으로만 처리하고 싶었으나,, 요건 방법이 없는 듯함. 나중에 아이디어 생기면 수정
   * */
  const [marginInterpolation, setMarginInterpolation] = useState(0);
  const doneCalcuateMargin = marginInterpolation !== 0;

  useEffect(() => {
    /** TODO: Hook으로 분리하기(useMobileSize) */
    const calcuateMobileSize = () => {
      setIsOverMobileSize(window.innerWidth >= 768);
    };

    calcuateMobileSize();

    window.addEventListener('resize', calcuateMobileSize);

    return () => {
      window.removeEventListener('resize', calcuateMobileSize);
    };
  }, []);

  useEffect(() => {
    /** 시각 라벨 표기에 따라 margin이 달라지므로 labelType에 따른 값를 설정
     * TODO: Hook으로 분리하기 (useCalcuatedMargin)
     */
    const calcuateMargin = () => {
      const milestone = document.querySelector('.milestone');

      if (milestone === null) {
        return;
      }

      const margin = milestone.getBoundingClientRect().width / 2;
      setMarginInterpolation(margin);
    };

    calcuateMargin();
  }, [labelType]);

  return (
    <div className="flex-1">
      {/* 진행 시간, 현재 시간, 남은 시간 */}
      <div
        className={cn('relative opacity-0 transition-opacity pointer-events-none', {
          ['opacity-100']: doneCalcuateMargin,
        })}
        style={{ marginInline: `${marginInterpolation}px` }}>
        <DurationLabel timeRatio={timeRatio} label={currentDurationLabel} />

        <div className="absolute bottom-0 -translate-x-1/2 translate-y-1 z-10" style={{ left: `${timeRatio * 100}%` }}>
          <TimeMilestone
            milestoneLabel="현재"
            timeLabel={curremtTimeLabel}
            order={TimeMilestoneOrder.TIME_TO_DOT}
            isActive
          />
        </div>

        <DurationLabel timeRatio={1 - timeRatio} label={remainDurationLabel} />

        <TimeMilestoneLine />
      </div>

      {/* 시작 시작, 종료 시간 */}
      <div className="flex-1 flex flex-row justify-between -translate-y-1 pointer-events-none relative">
        <TimeMilestone milestoneLabel="시작" timeLabel={startTimeLabel} order={TimeMilestoneOrder.DOT_TO_TIME} />
        <div className="">
          <TimeMilestone milestoneLabel="종료" timeLabel={endTimeLabel} order={TimeMilestoneOrder.DOT_TO_TIME} />
        </div>
      </div>
    </div>
  );
};

type DurationLabelProp = {
  timeRatio: number;
  label: string;
};

/**
 * DurationLabel은 (1) 현재 진행 시간 (2) 남은 시간을 표시하는 컴포넌트
 * 시간을 표기하기에 충분하지 않은 크기일 시 Hide 처리
 */
const DurationLabel = ({ label, timeRatio }: DurationLabelProp) => {
  const parentRef = useRef<HTMLDivElement>(null);
  const childRef = useRef<HTMLSpanElement>(null);

  const [isNarrow, setIsNarrow] = useState(true);

  useEffect(() => {
    if (parentRef.current === null || childRef.current === null) {
      return;
    }

    const { width: parentWidth } = parentRef.current.getBoundingClientRect();
    const { width: childWidth } = childRef.current.getBoundingClientRect();

    setIsNarrow(parentWidth <= childWidth);
  }, [label]);

  return (
    <div ref={parentRef} className="inline-block text-center translate-y-1/2" style={{ width: `${timeRatio * 100}%` }}>
      <span
        ref={childRef}
        className={cn(
          'text-xs px-1 py-[.125rem] bg-gray-50 rounded text-gray-700 whitespace-nowrap md:text-base visible',
          {
            ['invisible']: isNarrow,
          }
        )}>
        {label}
      </span>
    </div>
  );
};

enum TimeMilestoneOrder {
  'TIME_TO_DOT',
  'DOT_TO_TIME',
}

type TimeMilestoneProps = {
  milestoneLabel: string;
  timeLabel: string;
  order: TimeMilestoneOrder;
  isActive?: boolean;
};

/**
 * 시작, 현재, 종료 시각을 표시하는 컴포넌트
 *
 * 반응형으로 시각을 표시하는 표기 분기
 * Pointer를 사용하는 미디어 환경일 시 Hover 효과(Scale Up)
 */
const TimeMilestone = ({ milestoneLabel, order, timeLabel, isActive }: TimeMilestoneProps) => {
  const isDotToTime = order === TimeMilestoneOrder.DOT_TO_TIME;
  const isTimeToDot = order === TimeMilestoneOrder.TIME_TO_DOT;

  return (
    <div
      className={cn(
        'milestone flex gap-2 justify-center items-center transition-transform pointer-events-auto pointerdevice:hover:scale-125',
        {
          ['flex-col origin-top']: isDotToTime,
          ['flex-col-reverse origin-bottom']: isTimeToDot,
        }
      )}>
      <div
        className={cn('flex justify-center items-center gap-1', {
          ['flex-col']: isDotToTime,
          ['flex-col-reverse']: isTimeToDot,
        })}>
        {/* Dot */}
        <div
          className={cn('size-2 rounded-full', {
            ['bg-green-700']: isActive,
            ['bg-gray-300']: !isActive,
          })}
        />

        {/* Milestone Lable */}
        <span
          className={cn('text-xs md:text-base', {
            ['text-green-700 font-semibold']: isActive,
            ['text-gray-400']: !isActive,
          })}>
          {milestoneLabel}
        </span>
      </div>

      {/* Time Lable */}
      <span className="text-base font-semibold text-green-700 px-2 py-1 bg-green-50 rounded whitespace-nowrap md:text-lg">
        {timeLabel}
      </span>
    </div>
  );
};

const TimeMilestoneLine = () => {
  // Dash 스타일 바꾸려면 나중에 d3나 svg로 처리해야 함
  return <div className="w-full border-t border-dashed border-grey-200 pointer-events-none" />;
};
