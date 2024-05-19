'use client';

import { Button } from '@/components/ui/button';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import { PropsWithChildren, useRef, useState, useTransition } from 'react';
import { Control, useForm } from 'react-hook-form';
import { z } from 'zod';
import { signUpWithEmail } from './SignUpForm.action';
import { ErrorObject } from '@/types/api';

/**
 * NOTE: RSC에서 RCC로 넘길 수 있는 건 plain object라서 file이 지금 안 넘어가는 것 같은데.. 확인해봐야 할 것 같음.
 * 일단 프로필부분 주석처리하고 진행
 */

const MAX_UPLOAD_SIZE = 1024 * 1024 * 3; // 3MB
const ACCEPTED_FILE_TYPES = ['image/png'];

const formSchema = z
  .object({
    email: z.string(),
    password: z
      .string()
      .min(2, {
        message: '비밀번호는 최소 2글자 이상이어야 해요.',
      })
      .max(15, {
        message: '비밀번호는 최대 15글자 이하여야 해요.',
      }),
    passwordConfirm: z.string(),
    username: z.string().min(2, {
      message: '이름은 최소 2글자 이상',
    }),
    // profileImage: z
    //   .instanceof(File)
    //   .optional()
    //   .refine((file) => {
    //     return !file || file.size <= MAX_UPLOAD_SIZE;
    //   }, 'File size must be less than 3MB')
    //   .refine((file) => {
    //     return !file || ACCEPTED_FILE_TYPES.includes(file.type);
    //   }, 'File must be a PNG'),
  })
  .refine((data) => data.password === data.passwordConfirm, {
    message: '비밀번호를 다시 확인해주세요.',
    path: ['passwordConfirm'],
  });

export type SignUpRequest = z.infer<typeof formSchema>;

const initialValues: SignUpRequest = {
  email: '',
  password: '',
  passwordConfirm: '',
  username: '',
  // profileImage: undefined,
};

type SignUpFormProp = {
  defaultValues: { email: string };
  onSuccess: () => void;
};

export function SignUpForm({ onSuccess, defaultValues }: SignUpFormProp) {
  // Pending 및 Error State
  const [isPending, setIsPending] = useState(false);
  const [errorState, setErrorState] = useState<ErrorObject | null>(null);

  const startPending = () => setIsPending(true);
  const releasePending = () => setIsPending(false);
  const resetErrorState = () => setErrorState(null);

  // Client Validation
  const form = useForm<SignUpRequest>({
    resolver: zodResolver(formSchema),
    defaultValues: { ...initialValues },
  });

  const submitText = isPending ? '회원가입 중...' : '회원가입 하기';
  const hasError = errorState !== null;

  const handleSubmitAfterValidation = (data: SignUpRequest) => {
    requestSignUp(data);
  };

  const requestSignUp = async (data: SignUpRequest) => {
    startPending();
    resetErrorState();

    const { status, payload } = await signUpWithEmail(data);

    if (status === 200) {
      return onSuccess();
    }

    releasePending();
    setErrorState(payload);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmitAfterValidation)}
        className="w-full flex-1 flex"
        encType="multipart/form-data">
        <fieldset className="flex-1 flex flex-col border-none space-y-6" disabled={isPending}>
          <EmailField control={form.control} />
          <PasswordField control={form.control} />
          <PasswordConfirmField control={form.control} />
          <UsernameField control={form.control} />
          {/* <ProfileField control={form.control} /> */}
          {hasError && <p>{errorState.errorMessage}</p>}
          <SubmitButton>{submitText}</SubmitButton>
        </fieldset>
      </form>
    </Form>
  );
}

const EmailField = ({ control }: { control: Control<SignUpRequest, any> }) => {
  return (
    <FormField
      control={control}
      name="email"
      render={({ field }) => (
        <FormItem>
          <FormLabel>이메일*</FormLabel>
          <FormDescription>해당 이메일로 가입될 예정입니다.</FormDescription>
          <FormControl>
            <Input type="email" {...field} disabled iconType="email" />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

const PasswordField = ({ control }: { control: Control<SignUpRequest, any> }) => {
  return (
    <FormField
      control={control}
      name="password"
      render={({ field }) => (
        <FormItem>
          <FormLabel>비밀번호*</FormLabel>
          <FormDescription>비밀번호를 입력해주세요.</FormDescription>
          <FormControl>
            <Input type="password" {...field} placeholder="2글자 이상, 15글지 이하, 특문포함" iconType="password" />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

const PasswordConfirmField = ({ control }: { control: Control<SignUpRequest, any> }) => {
  return (
    <FormField
      control={control}
      name="passwordConfirm"
      render={({ field }) => (
        <FormItem>
          <FormLabel>비밀번호 확인*</FormLabel>
          <FormDescription>비밀번호를 다시 입력해주세요.</FormDescription>
          <FormControl>
            <Input type="password" placeholder="비밀번호 확인용" {...field} iconType="password" />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

const UsernameField = ({ control }: { control: Control<SignUpRequest, any> }) => {
  return (
    <FormField
      control={control}
      name="username"
      render={({ field }) => (
        <FormItem>
          <FormLabel>이름*</FormLabel>
          <FormDescription>다른 친구들에게 보여질 이름을 입력해주세요.</FormDescription>
          <FormControl>
            <Input placeholder="공식이" type="text" {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

// const ProfileField = ({ control }: { control: Control<SignUpRequest, any> }) => {
//   return (
//     <FormField
//       control={control}
//       name="profileImage"
//       render={({ field }) => (
//         <FormItem>
//           <FormLabel>프로필 사진</FormLabel>
//           <FormDescription>본인을 나타낼 수 있는 프로필 사진을 설정해주세요.</FormDescription>
//           <FormControl>
//             <Input type="file" accept="image/png" {...field} />
//           </FormControl>
//           <FormMessage />
//         </FormItem>
//       )}
//     />
//   );
// };

const SubmitButton = ({ children }: PropsWithChildren) => {
  return (
    <div className="flex-1 flex flex-col justify-end">
      <Button type="submit" className="w-full rounded-full">
        {children}
      </Button>
    </div>
  );
};
