'use client';

import { Button } from '@/components/ui/button';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { ActionStatus } from '@/enums/ActionStatus';
import { FormState } from '@/types/actions';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRef, useState, useTransition } from 'react';
import { Control, useForm } from 'react-hook-form';
import { z } from 'zod';

const formSchema = z.object({
  name: z.string().min(2, '반 이름은 최소 2글자 이상이어야 해요.').max(50, '반 이름은 최대 50글자 이하여야 해요.'),
  // .refine((data) => {
  //   const emojiRegex = /\p{Emoji}/u;
  //   const hasEmoji = emojiRegex.test(data);

  //   return !hasEmoji;
  // }, '이모지는 사용할 수 없어요.'),
  emoji: z.string().emoji(),
  description: z.string().optional(),
});

export type RequiredRequest = z.infer<typeof formSchema>;

const initialValues: RequiredRequest = {
  name: '',
  emoji: '😇',
  description: '',
};

type RequiredFormProp = {
  onSuccess: (data: RequiredRequest) => void;
};

export function RequiredForm({ onSuccess }: RequiredFormProp) {
  const formRef = useRef<HTMLFormElement>(null);

  const form = useForm<RequiredRequest>({
    resolver: zodResolver(formSchema),
    defaultValues: { ...initialValues },
  });

  const handleSubmitAfterValidation = (data: RequiredRequest) => {
    if (formRef.current === null) {
      throw new Error('formRef가 없음');
    }

    console.log({ data });
    onSuccess(data);
  };

  return (
    <Form {...form}>
      <form className="w-full flex-1 flex" ref={formRef} onSubmit={form.handleSubmit(handleSubmitAfterValidation)}>
        <fieldset className="flex flex-col border-none space-y-2 md:space-y-6 flex-1 w-full">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>반 이름*</FormLabel>
                <FormDescription>생성할 반의 이름을 알려주세요.</FormDescription>
                <FormControl>
                  <Input placeholder="멋진 우리반" type="text" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* TODO: Emoji Picker로 변경 */}
          <FormField
            control={form.control}
            name="emoji"
            render={({ field }) => (
              <FormItem>
                <FormLabel>반 아이콘*</FormLabel>
                <FormDescription>반 이미지에 어울리는 대표 이모지를 선택해주세요.</FormDescription>
                <FormControl>
                  <Input type="text" {...field} className="text-2xl" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>반 설명</FormLabel>
                <FormDescription>반에 대해서 설명해보쇼.</FormDescription>
                <FormControl>
                  {/* <Input placeholder="example@example.com" type="email" {...field} /> */}
                  <Textarea placeholder="나태함은 곧 죽음이오." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex-1 flex flex-col justify-end">
            <Button type="submit" className="w-full rounded-full">
              다음
            </Button>
          </div>
        </fieldset>
      </form>
    </Form>
  );
}
