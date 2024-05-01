'use server';

import { FormState } from '@/types/actions';
import { ActionStatus } from '@/enums/ActionStatus';

export async function sendSignUpMail(prevState: FormState, data: FormData): Promise<FormState> {
  console.log('sendSignUpMail: ', { prevState, data: { ...(Object.fromEntries(data) as { email: string }) } });

  await new Promise((resolve) => {
    setTimeout(() => resolve(null), 1500);
  });

  return { status: ActionStatus.Success, fields: { ...(Object.fromEntries(data) as { email: string }) } };
}
