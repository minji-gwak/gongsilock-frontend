'use server';

import { ActionStatus } from '@/enums/ActionStatus';
import { FormState } from '@/types/actions';

export async function loginService(prevState: FormState, data: FormData): Promise<FormState> {
  console.log('loginService: ', { prevState, data: Object.fromEntries(data) });

  // TODO: fetch Login
  await new Promise((resolve) => {
    setTimeout(() => resolve(null), 1500);
  });

  return { status: ActionStatus.Error, issues: ['에러여 에러'] };
  // return { status: ActionStatus.Success };
}
