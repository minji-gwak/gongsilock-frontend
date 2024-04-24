'use client';

import { Button } from '@/components/ui/button';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const formSchema = z.object({
  email: z
    .string()
    .min(2, {
      message: 'Email must be at least 2 characters.',
    })
    .email('이메일 형식을 따라주셈'),
});

export default function MailForm() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isError, setIsError] = useState(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
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
      router.replace('/reset-password/mail-sent');
    } else {
      setIsSubmitting(false);
      setIsError(result.message);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 w-full">
        <FormField
          disabled={isSubmitting}
          control={form.control}
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

        <Button type="submit" className="w-full rounded-full" disabled={isSubmitting}>
          {isSubmitting ? '제출중...' : '재설정 메일 보내기'}
        </Button>

        {isError && <p>{isError}</p>}
      </form>
    </Form>
  );
}
