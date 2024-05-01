import { ActionStatus } from '@/enums/ActionStatus';

export type FormState =
  | {
      status: ActionStatus.Success;
      fields?: Record<string, string>;
      message?: string;
    }
  | {
      status: ActionStatus.Error;
      issues: string[];
      fields?: Record<string, string>;
    }
  | {
      status: ActionStatus.Idle;
      fields?: Record<string, string>;
    };
