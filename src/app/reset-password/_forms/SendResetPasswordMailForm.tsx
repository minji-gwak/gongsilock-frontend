'use client';

import { Button } from '@/components/ui/button';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { ErrorObject } from '@/types/api';
import { zodResolver } from '@hookform/resolvers/zod';
import { PropsWithChildren, useState } from 'react';
import { Control, useForm } from 'react-hook-form';
import { z } from 'zod';
import { sendResetPasswordMail } from './SendResetPasswordMailForm.action';

const formSchema = z.object({
  email: z.string().email('이메일 형식을 따라주셈'),
});

export type SendResetPasswordMailRequest = z.infer<typeof formSchema>;

const initialValues: SendResetPasswordMailRequest = {
  email: '',
};

type SendResetPasswordMailFormProps = {
  onSuccess: (email: string) => void;
};

export default function SendResetPasswordMailForm({ onSuccess }: SendResetPasswordMailFormProps) {
  const [isPending, setIsPending] = useState(false);
  const [errorState, setErrorState] = useState<ErrorObject | null>(null);

  const startPending = () => setIsPending(true);
  const releasePending = () => setIsPending(false);
  const resetErrorState = () => setErrorState(null);

  const form = useForm<SendResetPasswordMailRequest>({
    resolver: zodResolver(formSchema),
    defaultValues: { ...initialValues },
  });

  const submitText = isPending ? '메일 보내는 중...' : '비밀번호 재설정 메일 보내기';
  const hasError = errorState !== null;

  const handleSubmitAfterValidation = (data: SendResetPasswordMailRequest) => {
    requestSendMail(data);
  };

  const requestSendMail = async (data: SendResetPasswordMailRequest) => {
    startPending();
    resetErrorState();

    const { status, payload } = await sendResetPasswordMail(data);

    if (status === 200) {
      return onSuccess(data.email);
    }

    releasePending();
    setErrorState(payload);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmitAfterValidation)} className="w-full flex-1 flex">
        <fieldset className="flex-1 flex flex-col border-none space-y-2 md:space-y-6" disabled={isPending}>
          <EmailField control={form.control} />
          <SubmitButton>{submitText}</SubmitButton>
        </fieldset>

        {hasError && <p>{errorState.errorMessage}</p>}
      </form>
    </Form>
  );
}

const EmailField = ({ control }: { control: Control<SendResetPasswordMailRequest, any> }) => {
  return (
    <FormField
      control={control}
      name="email"
      render={({ field }) => (
        <FormItem>
          <FormLabel>이메일</FormLabel>
          <FormControl>
            <Input placeholder="example@example.com" type="email" {...field} iconType="email" />
          </FormControl>
          <FormDescription>가입했을 당시의 이메일을 입력해주세요.</FormDescription>
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
