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
import { signUpWithEmail } from './SignUpForm.action';

/**
 * NOTE: RSC에서 RCC로 넘길 수 있는 건 plain object라서 file이 지금 안 넘어가는 것 같은데.. 확인해봐야 할 것 같음.
 * 일단 프로필부분 주석처리하고 진행
 */

const MAX_UPLOAD_SIZE = 1024 * 1024 * 3; // 3MB
const ACCEPTED_FILE_TYPES = ['image/png'];

const formSchema = z.object({
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
});

export type SignUpRequest = z.infer<typeof formSchema>;

const initialValues: SignUpRequest = {
  username: '',
  // profileImage: undefined,
};

type SignUpFormProp = {
  onSuccess: () => void;
};

export function SignUpForm({ onSuccess }: SignUpFormProp) {
  const [isPending, startTransition] = useTransition();
  const formRef = useRef<HTMLFormElement>(null);

  const [state, setState] = useState<FormState>({
    status: ActionStatus.Idle,
    fields: { ...initialValues },
  });

  const form = useForm<SignUpRequest>({
    resolver: zodResolver(formSchema),
    defaultValues: { ...state.fields },
  });

  const submitText = isPending ? '회원가입 중...' : '회원가입 하기';
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
      requestSignUp(formData);
    });
  };

  const requestSignUp = async (formData: FormData) => {
    const result = await signUpWithEmail(state, formData);

    if (result.status === ActionStatus.Success) {
      return onSuccess();
    } else {
      setState(result);
    }
  };

  return (
    <Form {...form}>
      <form
        ref={formRef}
        onSubmit={form.handleSubmit(handleSubmitAfterValidation)}
        className="w-full flex-1 flex"
        encType="multipart/form-data">
        <fieldset className="flex-1 flex flex-col border-none space-y-6" disabled={isPending}>
          <UsernameField control={form.control} />
          {/* <ProfileField control={form.control} /> */}
          {hasError && <p>{state.issues[0]}</p>}
          <SubmitButton>{submitText}</SubmitButton>
        </fieldset>
      </form>
    </Form>
  );
}

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
