'use server';

import { _withSuccess, requestEchoAPI } from '@/utils/apiHelper';
import { SendResetPasswordMailRequest } from './SendResetPasswordMailForm';

type SendResetPasswordMailReturn = {};

export async function sendResetPasswordMail(data: SendResetPasswordMailRequest) {
  return await requestEchoAPI(_withSuccess({} as SendResetPasswordMailReturn));
}
