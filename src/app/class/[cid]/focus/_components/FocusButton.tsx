'use client';

import { Pause, Play } from 'lucide-react';
import { FocusStatus, useFocusAction } from '../../_store/useFocusAction';
import { cn } from '@/lib/utils';

const getDurationLabel = (duration: number) => {
  const hours = Math.floor(duration / 3600);
  const minutes = Math.floor((duration % 3600) / 60);
  const seconds = duration % 60;

  const hoursText = hours !== 0 ? `${hours}시간` : '';
  const minutesText = minutes !== 0 ? `${minutes}분` : '';
  const secondsText = seconds !== 0 ? `${seconds}초` : '';

  return [hoursText, minutesText, hours === 0 ? secondsText : ''].join(' ');
};

export const FocusButton = () => {
  const { status: focusStatus, duration, startFocuing, stopFocusing } = useFocusAction();

  const isFocusing = focusStatus === FocusStatus.FOCUSING;
  const isNotFocusing = focusStatus === FocusStatus.NOT_FOCUSING;

  const yetToStart = isNotFocusing && duration === 0;

  const durationText = getDurationLabel(duration);

  return (
    <button
      onClick={() => {
        if (isFocusing) {
          stopFocusing();
        } else {
          startFocuing();
        }
      }}
      className={cn(
        'w-full text-[1.3125rem] flex flex-row gap-2 items-center justify-center py-3 rounded shadow-focusBtn active:scale-95 transition-transform select-none',
        {
          ['bg-green-50 text-green-700']: isNotFocusing,
          ['bg-green-500 text-white']: isFocusing,
        }
      )}>
      {isNotFocusing && <Play className="fill-green-700" />}
      {isFocusing && <Pause className="fill-white" />}

      {yetToStart && <span>집중을 시작해볼까요?</span>}

      {!yetToStart && isNotFocusing && (
        <span>
          오늘 <strong className="text-green-700">{durationText} 집중</strong>
          했어요
        </span>
      )}

      {!yetToStart && isFocusing && (
        <span>
          지금 <strong className="text-green-50">{durationText} 째 집중 </strong>
          중!
        </span>
      )}
    </button>
  );
};
