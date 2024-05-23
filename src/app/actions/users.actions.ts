'use server';

import { requestAPI } from '@/lib/fetcher';
import { HTTPMethod } from '@/types/api';

const BASE_API_URL = 'https://dosilock.kro.kr/api/v1';
// const BASE_API_URL = process.env.NODE_ENV === 'development' ? 'localhost:3000' : process.env.BASE_API_URL;
const USERS_API_URL = `${BASE_API_URL}/users`;

const USERS_ENDPOINT = {
  Default: `${USERS_API_URL}`,
  At: (userId: string) => `${USERS_API_URL}/${userId}`,
  resetPassword: `${USERS_API_URL}/reset-password`,
  mypage: `${USERS_API_URL}/me`,
  myClazz: `${USERS_API_URL}/me/clazz`,
};

type ResetPasswordRequest = {
  password: string;
};

export const resetPassword = async ({ password }: ResetPasswordRequest) => {
  return await requestAPI<null, ResetPasswordRequest>(HTTPMethod.PATCH, `${BASE_API_URL}/users/reset-password`, {
    password,
  });
};
