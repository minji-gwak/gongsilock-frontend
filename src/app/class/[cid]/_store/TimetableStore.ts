import { create } from 'zustand';
import { Period } from './PeriodsStore';

export enum DayOfWeek {
  MONDAY = 0,
  TUESDAY = 1,
  WEDNESDAY = 2,
  THURSDAY = 3,
  FRIDAY = 4,
  SATURDAY = 5,
  SUNDAY = 6,
}

export type Timetable = {
  name: string;
  dayOfWeeks: DayOfWeek[];
  periods: Period[];
};

export enum TimetableStoreStatus {
  NOT_INITIALIZED,
  INITIALIZED,
}

type TimetableStoreReturnBase = {
  updateTimetable: (timetable: Timetable) => void;
};

type TimetableStoreReturn =
  | ({
      status: TimetableStoreStatus.NOT_INITIALIZED;
      timetable: null;
    } & TimetableStoreReturnBase)
  | ({
      status: TimetableStoreStatus.INITIALIZED;
      timetable: Timetable;
    } & TimetableStoreReturnBase);

export const TimetableStore = create<TimetableStoreReturn>((set) => ({
  status: TimetableStoreStatus.NOT_INITIALIZED,
  timetable: null,

  updateTimetable: (timetable) => {
    return set({
      status: TimetableStoreStatus.INITIALIZED,
      timetable,
    });
  },
}));

export const useTimetable = TimetableStore;
