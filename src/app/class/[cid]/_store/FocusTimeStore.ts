import { create } from 'zustand';

export enum FocusStatus {
  FOCUSING,
  NOT_FOCUSING,
}

/**
 * 나중에 교시 별로 집중 시간도 볼 수 있게 하려면 집중 시작한 시각도 알긴 알아야 하는데
 * 일단은! 1차 목표인 오늘에 대한 집중 시간만 집중하자
 *
 * 그러보고니 집중 시간은 만약 브라우저를 다시 껐다가 켜도 유지가 되어야 하네.
 * 이 부분은 localStorage로 저장
 */
type FocusTimeStoreReturn = {
  status: FocusStatus;
  duration: number; // seconds

  resetDuration: () => void;
  startFocuing: () => void;
  stopFocusing: () => void;
  tick: () => void;
};

export const FocusTimeStore = create<FocusTimeStoreReturn>((set) => ({
  status: FocusStatus.NOT_FOCUSING,
  duration: typeof localStorage === 'undefined' ? 0 : Number(localStorage.getItem('focus-duration')) || 0,

  resetDuration: () => set({ duration: 0 }),

  startFocuing: () => set({ status: FocusStatus.FOCUSING }),
  stopFocusing: () => set({ status: FocusStatus.NOT_FOCUSING }),
  tick: () =>
    set((state) => {
      if (state.status === FocusStatus.FOCUSING) {
        return { duration: state.duration + 1 };
      }

      return { duration: state.duration };
    }),
}));

export const useFocusTime = FocusTimeStore;
