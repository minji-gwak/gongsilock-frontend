'use server';

import { ActionStatus } from '@/enums/ActionStatus';
import { FormState } from '@/types/actions';

export async function sendResetPasswordMail(prevState: FormState, data: FormData): Promise<FormState> {
  console.log('sendResetPasswordMail: ', { prevState, data: Object.fromEntries(data) });

  // TODO: request api to send reset-password mail
  await new Promise((resolve) => {
    setTimeout(() => resolve(null), 1500);
  });

  // return { status: ActionStatus.Error, issues: ['에러여 에러'] };
  return { status: ActionStatus.Success, fields: Object.fromEntries(data) as Record<string, string> };
}
