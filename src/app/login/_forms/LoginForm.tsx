'use client';

import { loginService } from '@/app/actions';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { ErrorObject, FetchStatus } from '@/types/api';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Control, useForm } from 'react-hook-form';
import { z } from 'zod';
// import { loginService } from './LoginForm.action';

const formSchema = z.object({
  email: z.string().email('이메일 형식을 따라주셈'),
  password: z
    .string()
    .min(2, {
      message: '비밀번호는 최소 2글자 이상이어야 해요.',
    })
    .max(15, {
      message: '비밀번호를 최대 15글자 이하여야 해요.',
    }),
});

export type LoginRequest = z.infer<typeof formSchema>;

const initialValues: LoginRequest = {
  email: '',
  password: '',
};

type LoginFormProps = {
  redirectUrl: string;
};

export const LoginForm = ({ redirectUrl }: LoginFormProps) => {
  const router = useRouter();

  // 폼 제출 Pending
  const [isPending, setIsPending] = useState(false);
  const startPending = () => setIsPending(true);
  const releasePending = () => setIsPending(false);

  // Server Validation 관련
  const [errorState, setErrorState] = useState<ErrorObject | null>(null);
  const resetErrorState = () => setErrorState(null);

  // Client Validation 관련
  const form = useForm<LoginRequest>({
    resolver: zodResolver(formSchema),
    defaultValues: { ...initialValues },
  });

  const submitText = isPending ? '로그인 중...' : '로그인';
  const hasError = errorState !== null;

  const handleSubmitAfterValidation = async (loginValues: LoginRequest) => {
    await requestLogin(loginValues);
  };

  const requestLogin = async (loginValues: LoginRequest) => {
    startPending();
    resetErrorState();

    const { status, data } = await loginService(loginValues);

    if (status === FetchStatus.SUCCESS) {
      router.push(redirectUrl);
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
      <form className="w-full" onSubmit={form.handleSubmit(handleSubmitAfterValidation)}>
        <fieldset className="border-none space-y-2 w-full md:space-y-6" disabled={isPending}>
          <EmailField control={form.control} />
          <PasswordField control={form.control} />

          <Button className="w-full rounded-full py-4 focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2" type="submit">
            {submitText}
          </Button>
        </fieldset>

        {hasError && <p>{errorState.errorMessage}</p>}
      </form>
    </Form>
  );
};

const EmailField = ({ control }: { control: Control<LoginRequest, any> }) => {
  return (
    <FormField
      control={control}
      name="email"
      render={({ field }) => (
        <FormItem>
          <FormLabel className="hidden md:block">이메일</FormLabel>
          <FormControl>
            <Input placeholder="example@example.com" type="email" iconType="email" {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

const PasswordField = ({ control }: { control: Control<LoginRequest, any> }) => {
  return (
    <FormField
      control={control}
      name="password"
      render={({ field }) => (
        <FormItem>
          <FormLabel className="hidden md:block">비밀번호</FormLabel>
          <FormControl>
            <Input placeholder="2글자 이상, 15글지 이하, 특문포함" type="password" iconType="password" {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

// const SubmitButton = () => {
//   /**
//    * useFormStatus는 form의 자식에서만 동작할 수 있는데,
//    * client validation을 위해 RHF의 handleSubmit을 사용하게 되면
//    * 내부 동작으로 preventDefault()가 거의 (무조건) 호출되기 때문에
//    * submit 이벤트가 form에 도달하지 못해 useFormStatus의 pending값이 무조건 false임
//    *
//    * 그래서 startTransition()으로 pending을 받기 위해선 어차피 props으로 받아야 하니
//    * 따로 안 빼고 한 번에 처리함.
//    */
//   const { pending } = useFormStatus();

//   return (
//     <Button type="submit" className="w-full rounded-full" disabled={pending}>
//       {pending ? '로그인 중...' : '로그인하기'}
//     </Button>
//   );
// };
