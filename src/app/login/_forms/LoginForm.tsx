'use client';

import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { ActionStatus } from '@/enums/ActionStatus';
import { FormState } from '@/types/actions';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRef, useState, useTransition } from 'react';
import { Control, useForm } from 'react-hook-form';
import { z } from 'zod';
import { loginService } from './LoginForm.action';

const formSchema = z.object({
  email: z.string().email('이메일 형식이어야 합니다.'),
  password: z
    .string()
    .min(2, {
      message: '비밀번호는 최소 2글자 이상이어야 해요.',
    })
    .max(15, {
      message: '비밀번호를 최대 15글자 이하여야 해요.',
    }),
});

const initialValues = {
  email: '',
  password: '',
};

export type LoginRequest = z.infer<typeof formSchema>;

type LoginFormProps = {
  onSuccess: () => void;
};

export const LoginForm = ({ onSuccess }: LoginFormProps) => {
  /**
   * useFormState를 사용해서 Progressive Enhencement를 구현하고 싶었고,
   * 폼이 제출되는 동안은 UI Block을 하고 싶었음.
   *
   * 그러기 위해선 폼 제출 상태를 알아야 했는데,
   * useForm에서 나오는 formState는 Server Action과 Sync로 동작하지 않음.
   *
   * 대안으로 startTransition()을 동해 Pending 상태를 나타내고자 했는데,
   * startTransition()의 callback은 async 여야 작동하는 듯.
   *
   * 하지만 useFormState에서 나오는 formAction은 async가 아니라,
   * 제출 후 isPending이 true로 변하긴 하지만 응답이 왔음에도 false로 돌아가지 않음
   *
   * 그래서 .. startTransition() 안에서 loginService() 를 직접 호출하는 식으로 가고,
   * form에 대한 state는 따로 관리하는 방식으로 일단 진행.
   *
   * Ref: https://github.com/orgs/react-hook-form/discussions/10757
   * Ref2: https://zenn.dev/tsuboi/articles/0fc94356667284#useformstate-%E3%81%A8-useformstatus-%E3%81%AB%E3%81%A4%E3%81%84%E3%81%A6
   */
  const [isPending, startTransition] = useTransition();

  const [state, setState] = useState<FormState>({
    status: ActionStatus.Idle,
    fields: { ...initialValues },
  });

  const form = useForm<LoginRequest>({
    resolver: zodResolver(formSchema),
    defaultValues: { ...state.fields },
  });

  const formRef = useRef<HTMLFormElement>(null);

  const submitText = isPending ? '로그인 중...' : '로그인 하기';
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
      requestLoginForm(formData);
    });
  };

  const requestLoginForm = async (formData: FormData) => {
    const result = await loginService(state, formData);

    if (result.status === ActionStatus.Success) {
      onSuccess();
    }

    setState(result);
  };

  return (
    <Form {...form}>
      <form className="w-full" ref={formRef} onSubmit={form.handleSubmit(handleSubmitAfterValidation)}>
        <fieldset className="border-none space-y-2 w-full md:space-y-6" disabled={isPending}>
          <EmailField control={form.control} />
          <PasswordField control={form.control} />

          <Button className="w-full rounded-full py-4" type="submit">
            {submitText}
          </Button>
        </fieldset>

        {hasError && <p>{state.issues[0]}</p>}
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
            <Input placeholder="example@example.com" type="email" {...field} />
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
            <Input placeholder="2글자 이상, 15글지 이하, 특문포함" type="password" {...field} />
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
