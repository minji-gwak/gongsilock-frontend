/**
 * timeWorker는 1초마다 알려주는 Web Worker임.
 */

export enum TimerEventAction {
  START_TIMER,
  STOP_TIMER,
}

export type TimerEvent =
  | {
      action: TimerEventAction.START_TIMER;
      payload: { interval: number };
    }
  | {
      action: TimerEventAction.STOP_TIMER;
    };

let _timerId: NodeJS.Timeout | null = null;

typeof self === 'object' &&
  self.addEventListener('message', (event: MessageEvent<TimerEvent>) => {
    const { data: timerEvent } = event;

    const wouldStartTimer = timerEvent.action === TimerEventAction.START_TIMER;

    if (wouldStartTimer) {
      const { interval } = timerEvent.payload;

      if (_timerId !== null) {
        return;
      }

      _timerId = setInterval(() => {
        postMessage(null);
      }, interval);
    }

    const wouldEndTimer = timerEvent.action === TimerEventAction.STOP_TIMER;

    if (wouldEndTimer && _timerId !== null) {
      clearInterval(_timerId);
    }
  });
