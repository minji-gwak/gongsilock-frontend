'use client';

import { useEffect } from 'react';
import { CurrentTimeStatus, useCurrentTime } from '../_store/useCurrentTime';
import { TimerEvent, TimerEventAction } from '../_workers/timeWorker';
import { FocusStatus, useFocusAction } from '../_store/useFocusAction';

export const TimeHandler = ({ serverTime }: { serverTime: Date }) => {
  const { status: currentTimeStatus, initializeTime, tick: currentTimeTick } = useCurrentTime();
  const { status: focusStatus, tick: focusTimeTick } = useFocusAction();

  useEffect(() => {
    if (currentTimeStatus === CurrentTimeStatus.NOT_SET) {
      return initializeTime(serverTime);
    }

    const timerWorker = new Worker(new URL('../_workers/timeWorker.ts', import.meta.url), { type: 'module' });

    const handleMessage = () => {
      currentTimeTick();
      focusTimeTick();
    };

    timerWorker.addEventListener('message', handleMessage.bind(this));

    const timerEvent: TimerEvent = {
      action: TimerEventAction.START_TIMER,
      payload: { interval: 10 },
    };

    timerWorker.postMessage(timerEvent);

    return () => {
      const timerEvent: TimerEvent = { action: TimerEventAction.STOP_TIMER };

      timerWorker.postMessage(timerEvent);
      timerWorker.terminate();
    };
  }, [currentTimeStatus]);

  return <></>;
};
