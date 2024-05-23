'use client';

import { Button } from '@/components/ui/button';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { ErrorObject, FetchStatus } from '@/types/api';
import { zodResolver } from '@hookform/resolvers/zod';
import { PropsWithChildren, useState } from 'react';
import { Control, useForm } from 'react-hook-form';
import { z } from 'zod';
import { useRouter } from 'next/navigation';
import { resetPassword } from '@/app/actions';

const passwordRegex = new RegExp(/^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,15}$/);

const formSchema = z
  .object({
    email: z.string().email(),
    password: z
      .string()
      .min(8, { message: '비밀번호는 최소 8자 이상이어야 합니다.' })
      .max(15, { message: '비밀번호는 최대 15자 이내이어야 합니다.' })
      .regex(passwordRegex, { message: '영문, 숫자, 특수문자 포함해서 머시기해라.' }),
    passwordConfirm: z.string(),
  })
  .superRefine(({ password, passwordConfirm }, ctx) => {
    if (password !== passwordConfirm) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: '비밀번호가 일치하지 않네요.',
        path: ['passwordConfirm'],
      });
    }
  });

export type ResetPasswordRequest = z.infer<typeof formSchema>;

const initialValues: ResetPasswordRequest = {
  email: '',
  password: '',
  passwordConfirm: '',
};

type ResetPasswordFormProps = {
  redirectURL: string;
  defaultValues: {
    email: string;
  };
};

export default function ResetPasswordForm({ redirectURL, defaultValues }: ResetPasswordFormProps) {
  const router = useRouter();

  // Pending 및 Error 상태
  const [isPending, setIsPending] = useState(false);
  const [errorState, setErrorState] = useState<ErrorObject | null>(null);

  const startPending = () => setIsPending(true);
  const releasePending = () => setIsPending(false);
  const resetErrorState = () => setErrorState(null);

  const form = useForm<ResetPasswordRequest>({
    resolver: zodResolver(formSchema),
    defaultValues: { ...initialValues, ...defaultValues },
  });

  const submitText = isPending ? '재설정 중...' : '비밀번호 재설정하기';
  const hasError = errorState !== null;

  const handleSubmitAfterValidation = (data: ResetPasswordRequest) => {
    requestResetPassword(data);
  };

  const requestResetPassword = async (passwordData: ResetPasswordRequest) => {
    startPending();
    resetErrorState();

    const { status, data } = await resetPassword(passwordData);

    if (status === FetchStatus.FAIL) {
      setErrorState(data);
      releasePending();
      return;
    }

    if (status === FetchStatus.NETWORK_ERROR) {
      // TODO: Toast 띄우기
      console.error('[NETWORK_ERROR]: requestResetPassword, ', data);
      releasePending();
      return;
    }

    if (status === FetchStatus.UNKNOWN_ERROR) {
      // TODO: Toast 띄우기
      console.error('[UNKNOWN_ERROR]: requestResetPassword, ', data);
      releasePending();
      return;
    }

    router.push(redirectURL);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmitAfterValidation)} className="w-full flex-1 flex">
        <fieldset className="flex-1 flex flex-col border-none space-y-2 md:space-y-6" disabled={isPending}>
          <EmailFeild control={form.control} />
          <PasswordField control={form.control} />
          <PasswordConfirmField control={form.control} />

          {hasError && <p>{errorState.errorMessage}</p>}
          <SubmitButton>{submitText}</SubmitButton>
        </fieldset>
      </form>
    </Form>
  );
}

const EmailFeild = ({ control }: { control: Control<ResetPasswordRequest, any> }) => {
  return (
    <FormField
      control={control}
      name="email"
      render={({ field }) => (
        <FormItem>
          <FormLabel>이메일</FormLabel>
          <FormControl>
            <Input placeholder="example@example.com" type="email" {...field} disabled iconType="email" />
          </FormControl>
          <FormDescription>해당 이메일의 비밀번호를 변경합니다.</FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

const PasswordField = ({ control }: { control: Control<ResetPasswordRequest, any> }) => {
  return (
    <FormField
      control={control}
      name="password"
      render={({ field }) => (
        <FormItem>
          <FormLabel>비밀번호 입력</FormLabel>
          <FormControl>
            <Input placeholder="비밀번호 조건" type="password" {...field} iconType="password" />
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
            <Input placeholder="다시 입력" type="password" {...field} iconType="password" />
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
