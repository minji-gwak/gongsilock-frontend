'use server';

import { _withError, _withSuccess, requestEchoAPI } from '@/utils/apiHelper';

type GetVerifiedEmailFromTokenResponse = {
  email: string;
};

export const getVerifiedEmailFromToken = async (token: string) => {
  if (token == 'test_invalid') {
    return await requestEchoAPI(_withError({ errorCode: 1101, errorMessage: '알 수 없는 토큰임' }));
  }

  return await requestEchoAPI(_withSuccess({ email: 'test@example.com' } as GetVerifiedEmailFromTokenResponse));
};
