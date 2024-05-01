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
  const [isPending, startTransition] = useTransition();

  const [state, setState] = useState<FormState>({
    status: ActionStatus.Idle,
    fields: { ...initialValues },
  });

  const form = useForm<SendResetPasswordMailRequest>({
    resolver: zodResolver(formSchema),
    defaultValues: { ...state.fields },
  });

  const formRef = useRef<HTMLFormElement>(null);

  const submitText = isPending ? '메일 보내는 중...' : '비밀번호 재설정 메일 보내기';
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
      requestSendMail(formData);
    });
  };

  const requestSendMail = async (formData: FormData) => {
    const result = await sendResetPasswordMail(state, formData);

    if (result.status === ActionStatus.Success) {
      return onSuccess(result.fields?.email);
    } else {
      setState(result);
    }
  };

  return (
    <Form {...form}>
      <form ref={formRef} onSubmit={form.handleSubmit(handleSubmitAfterValidation)} className="w-full flex-1 flex">
        <fieldset className="flex-1 flex flex-col border-none space-y-2 md:space-y-6" disabled={isPending}>
          <EmailField control={form.control} />
          <SubmitButton>{submitText}</SubmitButton>
        </fieldset>

        {hasError && <p>{state.issues[0]}</p>}
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
            <Input placeholder="example@example.com" type="email" {...field} />
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
