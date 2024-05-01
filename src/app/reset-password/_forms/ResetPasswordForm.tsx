'use client';

import { Button } from '@/components/ui/button';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { ActionStatus } from '@/enums/ActionStatus';
import { FormState } from '@/types/actions';
import { zodResolver } from '@hookform/resolvers/zod';
import { PropsWithChildren, useRef, useState, useTransition } from 'react';
import { Control, useForm } from 'react-hook-form';
import { z } from 'zod';
import { resetPassword } from './ResetPasswordForm.action';

const formSchema = z.object({
  password: z.string(),
  passwordConfirm: z.string(),
});

export type ResetPasswordRequest = z.infer<typeof formSchema>;

const initialValues: ResetPasswordRequest = {
  password: '',
  passwordConfirm: '',
};

type ResetPasswordFormProps = {
  onSuccess: () => void;
};

export default function ResetPasswordForm({ onSuccess }: ResetPasswordFormProps) {
  const [isPending, startTransition] = useTransition();

  const [state, setState] = useState<FormState>({
    status: ActionStatus.Idle,
    fields: { ...initialValues },
  });

  const form = useForm<ResetPasswordRequest>({
    resolver: zodResolver(formSchema),
    defaultValues: { ...state.fields },
  });

  const formRef = useRef<HTMLFormElement>(null);

  const submitText = isPending ? '재설정 중...' : '비밀번호 재설정하기';
  const hasError = state.status === ActionStatus.Error;

  const handleSubmitAfterValidation = () => {
    if (formRef.current === null) {
      throw new Error('formRef가 없음');
    }

    const formData = new FormData(formRef.current);

    setState({
      status: ActionStatus.Idle,
      fields: { ...(Object.fromEntries(formData) as Record<string, string>) },
    });

    startTransition(() => {
      requestResetPassword(formData);
    });
  };

  const requestResetPassword = async (formData: FormData) => {
    const result = await resetPassword(state, formData);

    if (result.status === ActionStatus.Success) {
      return onSuccess();
    } else {
      setState(result);
    }
  };

  return (
    <Form {...form}>
      <form ref={formRef} onSubmit={form.handleSubmit(handleSubmitAfterValidation)} className="w-full flex-1 flex">
        <fieldset className="flex-1 flex flex-col border-none space-y-2 md:space-y-6" disabled={isPending}>
          <PasswordField control={form.control} />
          <PasswordConfirmField control={form.control} />

          {hasError && <p>{state.issues[0]}</p>}
          <SubmitButton>{submitText}</SubmitButton>
        </fieldset>
      </form>
    </Form>
  );
}

const PasswordField = ({ control }: { control: Control<ResetPasswordRequest, any> }) => {
  return (
    <FormField
      control={control}
      name="password"
      render={({ field }) => (
        <FormItem>
          <FormLabel>비밀번호 입력</FormLabel>
          <FormControl>
            <Input placeholder="비밀번호 조건" type="password" {...field} />
          </FormControl>
          <FormDescription>비밀번호는 0~0글자, 특문 포함해서 머시기해라.</FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

const PasswordConfirmField = ({ control }: { control: Control<ResetPasswordRequest, any> }) => {
  return (
    <FormField
      control={control}
      name="passwordConfirm"
      render={({ field }) => (
        <FormItem>
          <FormLabel>비밀번호 재입력</FormLabel>
          <FormControl>
            <Input placeholder="다시 입력" type="password" {...field} />
          </FormControl>
          <FormDescription>비밀번호 확인을 위해 한 번 더 입력해보쇼</FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

const SubmitButton = ({ children }: PropsWithChildren) => {
  return (
    <div className="flex-1 flex flex-col justify-end">
      <Button type="submit" className="w-full rounded-full">
        {children}
      </Button>
    </div>
  );
};
