'use server';

import { _withSuccess, requestEchoAPI } from '@/utils/apiHelper';
import { ResetPasswordRequest } from './ResetPasswordForm';

type ResetPasswordReturn = {};

export async function resetPassword(data: ResetPasswordRequest) {
  return await requestEchoAPI(_withSuccess({} as ResetPasswordReturn));
}
