import { create } from 'zustand';

export type Period = {
  id: number;
  name: string;
  startTime: Date;
  duration: number;
};

export enum PeriodStatus {
  NOT_PERIODS_SET,
  BEFORE_FIRST_PERIOD,
  AFTER_LAST_PERIOD,
  IN_PERIOD,
}

type UsePeriodReturnBase = {
  updatePeriod: (newPeriod: Period | null, status: PeriodStatus) => void;
  setPeriods: (periods: Period[]) => void;
};

type UsePeriodReturn =
  | ({
      status: PeriodStatus.AFTER_LAST_PERIOD | PeriodStatus.BEFORE_FIRST_PERIOD;
      currentPeriod: null;
      periods: Period[];
    } & UsePeriodReturnBase)
  | ({
      status: PeriodStatus.IN_PERIOD;
      currentPeriod: Period;
      periods: Period[];
    } & UsePeriodReturnBase);

export const usePeriods = create<UsePeriodReturn>((set) => ({
  status: PeriodStatus.BEFORE_FIRST_PERIOD,
  currentPeriod: null,
  periods: [] as Period[],

  updatePeriod: (newPeriod: Period | null, status: PeriodStatus) => {
    const isBeforeFirstPeriod = status === PeriodStatus.BEFORE_FIRST_PERIOD;
    const isAfterLastPeriod = status === PeriodStatus.AFTER_LAST_PERIOD;
    const isInPeriod = status === PeriodStatus.IN_PERIOD;

    if (isBeforeFirstPeriod) {
      return set({
        status: PeriodStatus.BEFORE_FIRST_PERIOD,
        currentPeriod: null,
      });
    }

    if (isAfterLastPeriod) {
      return set({
        status: PeriodStatus.AFTER_LAST_PERIOD,
        currentPeriod: null,
      });
    }

    if (isInPeriod) {
      return set({
        status: PeriodStatus.IN_PERIOD,
        currentPeriod: newPeriod as Period,
      });
    }
  },
  setPeriods: (periods: Period[]) => set({ periods }),
}));
