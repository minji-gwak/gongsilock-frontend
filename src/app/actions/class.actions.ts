'use server';

import { requestAPI } from '@/lib/fetcher';
import { HTTPMethod } from '@/types/api';
import { ClassItem } from '@/types/clazz';
import { DayOfWeek } from '../class/[cid]/_store/TimetableStore';
import { PeriodForSubmit } from '../class/create/page';

const BASE_API_URL = 'https://dosilock.kro.kr/api/v1';
// const BASE_API_URL = process.env.NODE_ENV === 'development' ? 'localhost:3000' : process.env.BASE_API_URL;
const CLAZZ_API_URL = `${BASE_API_URL}/clazz`;

const CLAZZ_ENDPOINT = {
  Default: `${CLAZZ_API_URL}`,
  At: (clazzId: string) => `${CLAZZ_API_URL}/${clazzId}`,
  MembersOf: (clazzId: string) => `${CLAZZ_API_URL}/${clazzId}/members`,
};

// const CLAZZ_ENDPOINT = {
//   GetMembers: (clazzId: string) => `${CLAZZ_API_URL}/${clazzId}/members`,
//   ApproveMember: (clazzId: string) => `${CLAZZ_API_URL}/${clazzId}/members/approve`,
//   RejectMember: (clazzId: string) => `${CLAZZ_API_URL}/${clazzId}/members/reject`,
//   ApplyToClazz: (clazzId: string) => `${CLAZZ_API_URL}/${clazzId}/members/apply`,
//   CreateClazz: `${CLAZZ_API_URL}`,
//   ClazzDetails: (clazzId: string) => `${CLAZZ_API_URL}/${clazzId}`,
// };

export const fetchMyClazzList = async () => {
  return await requestAPI<ClassItem[], null>(HTTPMethod.GET, `${BASE_API_URL}/clazz/list`);
};

export type CreateClazzWithTimetableRequest = {
  clazzName: string;
  clazzDescription: string;
  clazzIcon: string;
  timetableRequest: {
    timetableName: string;
    timetableDays: DayOfWeek[];
    periodRequests: {
      periodName: string;
      periodDuration: number;
      periodStartTime: string;
      isAttendanceRequired: boolean;
    }[];
  };
};

type CreateClazzWithTimetableResponse = {
  clazzLink: string;
};

export const createClazzWithTimetable = async (payload: CreateClazzWithTimetableRequest) => {
  return await requestAPI<CreateClazzWithTimetableResponse, CreateClazzWithTimetableRequest>(
    HTTPMethod.POST,
    `${BASE_API_URL}/clazz/`,
    payload
  );
};
