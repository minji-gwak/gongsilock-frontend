'use server';

import { _withSuccess, requestEchoAPI } from '@/utils/apiHelper';
import { SignUpRequest } from './SignUpForm';

export async function signUpWithEmail(data: SignUpRequest) {
  return await requestEchoAPI(_withSuccess({}));
}
