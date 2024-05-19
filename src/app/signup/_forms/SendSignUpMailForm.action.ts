'use server';

import { _withSuccess, requestEchoAPI } from '@/utils/apiHelper';
import { SendSignUpMailRequest } from './SendSignUpMailForm';

export async function sendSignUpMail(data: SendSignUpMailRequest) {
  return await requestEchoAPI(_withSuccess({}));
}
