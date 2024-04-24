'use client';

import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, FormDescription } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const MAX_UPLOAD_SIZE = 1024 * 1024 * 3; // 3MB
const ACCEPTED_FILE_TYPES = ['image/png'];

const formSchema = z.object({
  username: z.string().min(2, {
    message: '이름은 최소 2글자 이상',
  }),
  profileImage: z
    .instanceof(File)
    .optional()
    .refine((file) => {
      return !file || file.size <= MAX_UPLOAD_SIZE;
    }, 'File size must be less than 3MB')
    .refine((file) => {
      return !file || ACCEPTED_FILE_TYPES.includes(file.type);
    }, 'File must be a PNG'),
});

export default function SigninForm() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isError, setIsError] = useState(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: '',
      profileImage: undefined,
    },
  });

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    setIsSubmitting(true);

    const result = await new Promise((resolve) => {
      setTimeout(
        () =>
          resolve({
            status: 'OK',
            message: null,
          }),
        1500
      );
    });

    if (result.status === 'OK') {
      router.replace('/register/mail-sent');
    } else {
      setIsSubmitting(false);
      setIsError(result.message);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 w-full" encType="multipart/form-data">
        <FormField
          disabled={isSubmitting}
          control={form.control}
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

        <FormField
          disabled={isSubmitting}
          control={form.control}
          name="profileImage"
          render={({ field }) => (
            <FormItem>
              <FormLabel>프로필 사진</FormLabel>
              <FormDescription>본인을 나타낼 수 있는 프로필 사진을 설정해주세요.</FormDescription>
              <FormControl>
                <Input type="file" accept="image/png" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full rounded-full" disabled={isSubmitting}>
          {isSubmitting ? '제출중...' : '회원가입'}
        </Button>

        {isError && <p>{isError}</p>}
      </form>
    </Form>
  );
}
