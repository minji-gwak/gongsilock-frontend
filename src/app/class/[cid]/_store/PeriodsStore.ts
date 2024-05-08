import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

export type Period = {
  id: number;
  name: string;
  startTime: Date;
  duration: number;
  isAttendacneRequired: boolean;
};

export enum PeriodStatus {
  NOT_PERIODS_SET,
  BEFORE_FIRST_PERIOD,
  AFTER_LAST_PERIOD,
  IN_PERIOD,
}

type PeriodsStoreReturnBase = {
  initializePeriodsStore: (periods: Period[], status: PeriodStatus, currentPeriod: Period | null) => void;
  updatePeriod: (newPeriod: Period | null, status: PeriodStatus) => void;
};

type PeriodsStoreReturn =
  | ({
      status: PeriodStatus.NOT_PERIODS_SET;
      currentPeriod: null;
      periods: null;
    } & PeriodsStoreReturnBase)
  | ({
      status: PeriodStatus.AFTER_LAST_PERIOD | PeriodStatus.BEFORE_FIRST_PERIOD;
      currentPeriod: null;
      periods: Period[];
    } & PeriodsStoreReturnBase)
  | ({
      status: PeriodStatus.IN_PERIOD;
      currentPeriod: Period;
      periods: Period[];
    } & PeriodsStoreReturnBase);

export const PeriodsStore = create<PeriodsStoreReturn>()(
  devtools((set) => ({
    status: PeriodStatus.NOT_PERIODS_SET,
    currentPeriod: null,
    periods: null,

    initializePeriodsStore: (periods, status, currentPeriod) => {
      const isBeforeFirstPeriod = status === PeriodStatus.BEFORE_FIRST_PERIOD;
      const isAfterLastPeriod = status === PeriodStatus.AFTER_LAST_PERIOD;
      const isInPeriod = status === PeriodStatus.IN_PERIOD;

      if (isBeforeFirstPeriod) {
        return set({
          status: PeriodStatus.BEFORE_FIRST_PERIOD,
          currentPeriod: null,
          periods,
        });
      }

      if (isAfterLastPeriod) {
        return set({
          status: PeriodStatus.AFTER_LAST_PERIOD,
          currentPeriod: null,
          periods,
        });
      }

      if (isInPeriod) {
        return set({
          status: PeriodStatus.IN_PERIOD,
          currentPeriod: currentPeriod!,
          periods,
        });
      }
    },

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
  }))
);

export const usePeriods = PeriodsStore;
