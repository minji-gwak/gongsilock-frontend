'use client';

import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { ActionStatus } from '@/enums/ActionStatus';
import { FormState } from '@/types/actions';
import { zodResolver } from '@hookform/resolvers/zod';
import { PropsWithChildren, useRef, useState, useTransition } from 'react';
import { Control, useForm } from 'react-hook-form';
import { z } from 'zod';
import { sendSignUpMail } from './SendSignUpMailForm.action';

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
  const [isPending, startTransition] = useTransition();
  const formRef = useRef<HTMLFormElement>(null);

  const [state, setState] = useState<FormState>({
    status: ActionStatus.Idle,
    fields: { ...initialValues },
  });

  const form = useForm<SendSignUpMailRequest>({
    resolver: zodResolver(formSchema),
    defaultValues: { ...state.fields },
  });

  const submitText = isPending ? '전송 중...' : '회원가입 메일 보내기';
  const hasError = state.status === ActionStatus.Error;

  const handleSubmitAfterValidation = () => {
    if (formRef.current === null) {
      throw new Error('formRef가 없음');
    }

    const formData = new FormData(formRef.current);

    setState({
      status: ActionStatus.Idle,
      fields: { ...(Object.fromEntries(formData) as Record<string, string>) },
    } as FormState);

    startTransition(() => {
      requestSendSignUpMail(formData);
    });
  };

  const requestSendSignUpMail = async (formData: FormData) => {
    const result = await sendSignUpMail(state, formData);

    if (result.status === ActionStatus.Success) {
      return onSuccess(result.fields?.email);
    } else {
      setState(result);
    }
  };

  return (
    <Form {...form}>
      <form className="w-full flex-1 flex" ref={formRef} onSubmit={form.handleSubmit(handleSubmitAfterValidation)}>
        <fieldset className="flex-1 flex flex-col border-none space-y-2 md:space-y-6" disabled={isPending}>
          <EmailField control={form.control} />
          {hasError && <p>{state.issues[0]}</p>}
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
            <Input placeholder="example@example.com" type="email" {...field} />
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
