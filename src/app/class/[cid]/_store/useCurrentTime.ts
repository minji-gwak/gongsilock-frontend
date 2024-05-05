import { addMinutes, addSeconds } from 'date-fns';
import { create } from 'zustand';

export enum CurrentTimeStatus {
  NOT_SET,
  SET_WITH_SERVER_TIME,
}

type UseCurrentTimeReturn =
  | {
      status: CurrentTimeStatus.NOT_SET;
      currentTime: null;
      initializeTime: (serverTime: Date) => void;
      tick: () => void;
    }
  | {
      status: CurrentTimeStatus.SET_WITH_SERVER_TIME;
      currentTime: Date;
      initializeTime: (serverTime: Date) => void;
      tick: () => void;
    };

export const useCurrentTime = create<UseCurrentTimeReturn>((set) => ({
  status: CurrentTimeStatus.NOT_SET,
  currentTime: null,
  initializeTime: (serverTime: Date) =>
    set({
      status: CurrentTimeStatus.SET_WITH_SERVER_TIME,
      currentTime: serverTime,
    }),
  tick: () => set(({ currentTime: prevTime }) => ({ currentTime: addMinutes(prevTime!, 1) })),
}));
