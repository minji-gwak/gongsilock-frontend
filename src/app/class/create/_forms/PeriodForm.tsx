'use client';

import { Button } from '@/components/ui/button';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { zodResolver } from '@hookform/resolvers/zod';
import { PropsWithChildren, useEffect, useRef } from 'react';
import { Control, useForm } from 'react-hook-form';
import * as RadioGroup from '@radix-ui/react-radio-group';
import { z } from 'zod';
import { AttendanceType, CreateFormSchema, PeriodForSubmit } from '../page';
import { motion } from 'framer-motion';

const formSchema = z.object({
  name: z.string().min(2, '교시 이름은 최소 2글자 이상이어야 해요.').max(50, '교시 이름은 최대 50글자 이하여야 해요.'),
  isAttendanceRequired: z.enum(['yes', 'no']),
});

export type PeriodRequest = Pick<PeriodForSubmit, 'name' | 'isAttendanceRequired'>;
// export type PeriodRequest = z.infer<typeof formSchema>;
type PeriodFormProp = {
  defaultValues: PeriodRequest;
  onSuccess: (data: PeriodRequest) => void;
};

export function PeriodForm({ defaultValues, onSuccess }: PeriodFormProp) {
  const form = useForm<PeriodRequest>({
    resolver: zodResolver(formSchema),
    defaultValues: { ...defaultValues },
  });

  useEffect(() => {
    form.reset({ ...defaultValues });
  }, [defaultValues]);

  const handleSubmitAfterValidation = (data: PeriodRequest) => {
    onSuccess(data);
  };

  return (
    <Form {...form}>
      <form className="w-full flex-1 flex" onSubmit={form.handleSubmit(handleSubmitAfterValidation)}>
        <fieldset className="flex flex-col border-none space-y-2 md:space-y-6 flex-1 w-full">
          <PeriodNameField control={form.control} />
          <AttendanceRequiredField control={form.control} />

          <SubmitButton disabled={!form.formState.isDirty}>수정</SubmitButton>
        </fieldset>
      </form>
    </Form>
  );
}

const PeriodNameField = ({ control }: { control: Control<PeriodRequest, any> }) => {
  return (
    <FormField
      control={control}
      name="name"
      render={({ field }) => (
        <FormItem>
          <FormLabel>교시 이름*</FormLabel>
          <FormDescription>해당 교시의 이름을 입력해주세요.</FormDescription>
          <FormControl>
            <Input placeholder="교시1" type="text" {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

const MotionedIndicator = motion(RadioGroup.Indicator);

const AttendanceRequiredField = ({ control }: { control: Control<PeriodRequest, any> }) => {
  return (
    <>
      <FormField
        control={control}
        name="isAttendanceRequired"
        render={({ field }) => (
          <FormItem>
            <FormLabel>해당 교시 출석체크 여부</FormLabel>
            <FormDescription>해당 교시에 대한 출석체크 여부를 따로 설정할 수 있어요.</FormDescription>

            <FormControl>
              <RadioGroup.Root
                {...field}
                defaultValue={field.value}
                onValueChange={field.onChange}
                className="round bg-green-50 p-1 flex flex-row gap-1 w-fit">
                <RadioGroup.Item
                  value={AttendanceType.YES}
                  aria-label="출석 체크"
                  className="px-3 py-[.5rem] rounded relative">
                  <span className="relative z-10">출석체크</span>
                  <MotionedIndicator layoutId="indicator" className="absolute inset-0 bg-white rounded" />
                </RadioGroup.Item>

                <RadioGroup.Item
                  value={AttendanceType.NO}
                  aria-label="출석 체크 안 함"
                  className="px-3 py-[.5rem] rounded relative">
                  <span className="relative z-10">출석체크 안 함</span>
                  <MotionedIndicator layoutId="indicator" className="absolute inset-0 bg-white rounded" />
                </RadioGroup.Item>
              </RadioGroup.Root>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  );
};

const SubmitButton = ({ children, disabled }: PropsWithChildren<{ disabled: boolean }>) => {
  return (
    <div className="flex-1 flex flex-col justify-end">
      <Button type="submit" className="w-full rounded-full" disabled={disabled}>
        {children}
      </Button>
    </div>
  );
};
