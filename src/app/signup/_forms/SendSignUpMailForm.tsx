'use client';

import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import { PropsWithChildren, useRef, useState, useTransition } from 'react';
import { Control, useForm } from 'react-hook-form';
import { z } from 'zod';
import { sendSignUpMail } from './SendSignUpMailForm.action';
import { ErrorObject } from '@/types/api';

const formSchema = z.object({
  email: z.string().email('이메일 형식을 따라주셈'),
});

export type SendSignUpMailRequest = z.infer<typeof formSchema>;

const initialValues: SendSignUpMailRequest = {
  email: '',
};

type SendSignUpMailFormProp = {
  onSuccess: (email: string) => void;
};

export function SendSignUpMailForm({ onSuccess }: SendSignUpMailFormProp) {
  // Pending 및 Error State
  const [isPending, setIsPending] = useState(false);
  const [errorState, setErrorState] = useState<ErrorObject | null>(null);

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

  const requestSendSignUpMail = async (data: SendSignUpMailRequest) => {
    setIsPending(true);
    setErrorState(null);

    const { status, payload } = await sendSignUpMail(data);

    if (status === 200) {
      return onSuccess(data.email);
    }

    setErrorState(payload);
    setIsPending(false);
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
