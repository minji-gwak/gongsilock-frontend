'use server';

import { _withSuccess, requestEchoAPI } from '@/utils/apiHelper';
import { DayOfWeek } from '../_store/TimetableStore';

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

type GetServerTimeResponse = {
  serverTime: Date;
};

export const getServerTime = async () =>
  requestEchoAPI(_withSuccess({ serverTime: new Date('2024-05-07 04:45:00') } as GetServerTimeResponse));

type GetTimetableResponse = {
  timetable: TimetableResponse;
};
export const getTimetable = async () => requestEchoAPI(_withSuccess({ timetable: _timetable } as GetTimetableResponse));

/**
 * Note: 해당 더미 데이터는 오로지 화면 구성만 위한 데이터임.
 * 실제로 실시간으로 집중 시간을 주고 받을 때는 다른 방식일 것.
 */
export type RankItem = {
  id: number;
  name: string;
  profileURL: string;
  focusTime: number;
  isFocusing: boolean;
};

import fox from '@/static/images/fox.jpg';

const _rankingList: RankItem[] = [
  {
    id: 1, // UserId
    name: '황영웅',
    profileURL: fox.src,
    focusTime: 3600 * 1 + 60 * 14 + 4, // Seconds
    isFocusing: false,
  },
  {
    id: 2, // UserId
    name: '곽민지',
    profileURL: fox.src,
    focusTime: 3600 * 1, // Seconds
    isFocusing: true,
  },
  {
    id: 3, // UserId
    name: '권동휘',
    profileURL: fox.src,
    focusTime: 60 * 58 + 15, // Seconds
    isFocusing: true,
  },
  {
    id: 4, // UserId
    name: '김주현',
    profileURL: fox.src,
    focusTime: 60 * 1 + 4, // Seconds
    isFocusing: false,
  },
];

type GetFocusRankingResponse = {
  rankingList: RankItem[];
};

export const getFocusRanking = async () =>
  requestEchoAPI(_withSuccess({ rankingList: _rankingList } as GetFocusRankingResponse));
