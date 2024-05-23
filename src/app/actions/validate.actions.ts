'use server';

import { requestAPI } from '@/lib/fetcher';
import { HTTPMethod } from '@/types/api';

const BASE_API_URL = 'https://dosilock.kro.kr/api/v1';
// const BASE_API_URL = process.env.NODE_ENV === 'development' ? 'localhost:3000' : process.env.BASE_API_URL;

const VALIDATE_ENDPOINT = {
  validate: `${BASE_API_URL}/validate-token`,
};

type GetVerifiedEmailFromTokenRequest = {
  token: string;
};

type GetVerifiedEmailFromTokenResponse = {
  email: string;
};

export const getVerifiedEmailFromToken = async ({ token }: GetVerifiedEmailFromTokenRequest) => {
  return await requestAPI<GetVerifiedEmailFromTokenResponse, GetVerifiedEmailFromTokenRequest>(
    HTTPMethod.GET,
    `${BASE_API_URL}/link/${token}`
  );
};
