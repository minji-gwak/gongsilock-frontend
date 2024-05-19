'use server';

import { _withError, _withSuccess, requestEchoAPI } from '@/utils/apiHelper';

type GetVerifiedEmailFromTokenResponse = {
  email: string;
};

export const getVerifiedEmailFromToken = async (token: string) => {
  if (token == 'test_invalid') {
    return await requestEchoAPI(_withError({ errorCode: 1101, errorMessage: '이메일 중복' }));
  }

  return await requestEchoAPI(_withSuccess({ email: 'text@example.com' } as GetVerifiedEmailFromTokenResponse));
};
