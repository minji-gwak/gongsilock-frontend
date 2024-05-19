'use server';

import { _withSuccess, requestEchoAPI } from '@/utils/apiHelper';
import { CreateFormSchema } from '../page';

type CreateClazzWithTimetable = {
  clazzId: string;
};

export const createClazzWithTimetable = async (data: CreateFormSchema) =>
  requestEchoAPI(_withSuccess({ clazzId: '12321' } as CreateClazzWithTimetable));
