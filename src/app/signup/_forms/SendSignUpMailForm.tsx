'use client';

import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import { PropsWithChildren, useRef, useState, useTransition } from 'react';
import { Control, useForm } from 'react-hook-form';
import { z } from 'zod';
import { ErrorObject, FetchStatus } from '@/types/api';
import { useRouter } from 'next/navigation';
import { sendSignUpMail } from '@/app/actions';

const formSchema = z.object({
  email: z.string().email('이메일 형식을 따라주셈'),
});

export type SendSignUpMailRequest = z.infer<typeof formSchema>;

const initialValues: SendSignUpMailRequest = {
  email: '',
};

export function SendSignUpMailForm() {
  const router = useRouter();

  // 폼 제출 Pending
  const [isPending, setIsPending] = useState(false);
  const startPending = () => setIsPending(true);
  const releasePending = () => setIsPending(false);

  // Server Validation 관련
  const [errorState, setErrorState] = useState<ErrorObject | null>(null);
  const resetErrorState = () => setErrorState(null);

  // Client Validation
  const form = useForm<SendSignUpMailRequest>({
    resolver: zodResolver(formSchema),
    defaultValues: { ...initialValues },
  });

  const submitText = isPending ? '전송 중...' : '회원가입 메일 보내기';
  const hasError = errorState !== null;

  const handleSubmitAfterValidation = (data: SendSignUpMailRequest) => {
    requestSendSignUpMail(data);
  };

  const requestSendSignUpMail = async (formdata: SendSignUpMailRequest) => {
    startPending();
    resetErrorState();

    const { status, data } = await sendSignUpMail(formdata);

    if (status === FetchStatus.SUCCESS) {
      router.push(`/signup/mail-sent?mail=${formdata.email}`);
    }

    if (status === FetchStatus.FAIL) {
      setErrorState(data);
      releasePending();
      return;
    }

    if (status === FetchStatus.NETWORK_ERROR) {
      // TODO: Toast 띄우기
      console.error('[NETWORK_ERROR]: requestLogin, ', data);
      releasePending();
      return;
    }

    if (status === FetchStatus.UNKNOWN_ERROR) {
      // TODO: Toast 띄우기
      console.error('[UNKNWON_ERROR]: requestLogin, ', data);
      releasePending();
      return;
    }
  };

  return (
    <Form {...form}>
      <form className="w-full flex-1 flex" onSubmit={form.handleSubmit(handleSubmitAfterValidation)}>
        <fieldset className="flex-1 flex flex-col border-none space-y-2 md:space-y-6" disabled={isPending}>
          <EmailField control={form.control} />
          {hasError && <p>{errorState.errorMessage}</p>}
          <SubmitButton>{submitText}</SubmitButton>
        </fieldset>
      </form>
    </Form>
  );
}

const EmailField = ({ control }: { control: Control<SendSignUpMailRequest, any> }) => {
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
