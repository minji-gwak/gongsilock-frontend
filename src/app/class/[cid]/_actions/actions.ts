'use server';

import { DayOfWeek } from '../_store/TimetableStore';

const requestEchoAPI = <T>(result: T) => {
  return new Promise<T>((resolve) => {
    const timerId = setTimeout(() => {
      resolve(result);
      clearTimeout(timerId);
    }, 1500);
  });
};

export type TimetableResponse = {
  name: string;
  dayOfWeeks: DayOfWeek[];
  periods: InitialPeriod[];
};

export type InitialPeriod = {
  id: number;
  name: string;
  startTime: string; // HH:mm 형식
  duration: number;
  isAttendacneRequired: boolean;
};

const _timetable: TimetableResponse = {
  name: '열심히 살자',
  dayOfWeeks: [
    DayOfWeek.MONDAY,
    DayOfWeek.TUESDAY,
    DayOfWeek.WEDNESDAY,
    DayOfWeek.THURSDAY,
    DayOfWeek.FRIDAY,
    DayOfWeek.SATURDAY,
    DayOfWeek.SUNDAY,
  ],
  periods: [
    { id: 0, name: '오전1', startTime: '09:00', duration: 180, isAttendacneRequired: false },
    { id: 1, name: '점심 시간', startTime: '12:00', duration: 90, isAttendacneRequired: false },
    { id: 2, name: '오후1', startTime: '13:30', duration: 240, isAttendacneRequired: false },
    { id: 3, name: '저녁 시간', startTime: '17:30', duration: 90, isAttendacneRequired: false },
    { id: 4, name: '오후2', startTime: '19:00', duration: 240, isAttendacneRequired: false },
    // { id: 0, name: '오전1', startTime: new Date('2024-05-04 09:00:00'), duration: 180, isAttendacneRequired: false },
    // { id: 1, name: '점심 시간', startTime: new Date('2024-05-04 12:00:00'), duration: 90, isAttendacneRequired: false },
    // { id: 2, name: '오후1', startTime: new Date('2024-05-04 13:30:00'), duration: 240, isAttendacneRequired: false },
    // { id: 3, name: '저녁 시간', startTime: new Date('2024-05-04 17:30:00'), duration: 90, isAttendacneRequired: false },
    // { id: 4, name: '오후2', startTime: new Date('2024-05-04 19:00:00'), duration: 240, isAttendacneRequired: false },
  ],
};

export const getServerTime = async () => requestEchoAPI(new Date('2024-05-07 04:45:00'));
export const getTimetable = async () => requestEchoAPI(_timetable);
