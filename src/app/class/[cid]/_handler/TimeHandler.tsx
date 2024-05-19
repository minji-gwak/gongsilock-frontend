'use client';

import { useEffect } from 'react';
import { CurrentTimeStatus, useCurrentTime } from '../_store/CurrentTimeStore';
import { TimerEvent, TimerEventAction } from '../_workers/timeWorker';
import { useFocusTime } from '../_store/FocusTimeStore';

const TIMER_INTERVAL = 1; // For test
// const TIMER_INTERVAL = 1000 * 1; // 1초

export const TimeHandler = ({ serverTime }: { serverTime: Date }) => {
  const { status, initializeTime, tick: currentTimeTick } = useCurrentTime();
  const { tick: focusTimeTick } = useFocusTime();

  const registerTimerWorker = () => {
    const timerWorker = new Worker(new URL('../_workers/timeWorker.ts', import.meta.url), { type: 'module' });

    const handleMessage = () => {
      currentTimeTick();
      focusTimeTick();
    };

    timerWorker.addEventListener('message', handleMessage);

    return timerWorker;
  };

  const startTimer = (timerWorker: Worker) => {
    const startTimerEvent: TimerEvent = {
      action: TimerEventAction.START_TIMER,
      payload: { interval: TIMER_INTERVAL },
    };

    timerWorker.postMessage(startTimerEvent);
  };

  const terminateTimer = (timerWorker: Worker) => {
    const stopTimerEvent: TimerEvent = { action: TimerEventAction.STOP_TIMER };

    timerWorker.postMessage(stopTimerEvent);
    timerWorker.terminate();
  };

  useEffect(() => {
    if (status === CurrentTimeStatus.NOT_SET) {
      return initializeTime(serverTime);
    }

    if (serverTime === undefined) {
      throw new Error("serverTime shouldn't be undefined when status isn't SET_WITH_SERVER_TIME");
    }

    const timerWorker = registerTimerWorker();
    startTimer(timerWorker);

    return () => {
      terminateTimer(timerWorker);
    };
  }, [status]);

  return <></>;
};
