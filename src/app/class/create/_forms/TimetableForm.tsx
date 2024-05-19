'use client';

/**
 * Note: 각 필드에 대한 UI는 일단 나중에 ... 기능 위주로.
 */

import { Button } from '@/components/ui/button';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import * as RadioGroup from '@radix-ui/react-radio-group';
import { motion } from 'framer-motion';
import { PropsWithChildren } from 'react';
import { Control, useForm } from 'react-hook-form';
import { z } from 'zod';
import { DayOfWeekSelector } from '../_components/DayOfWeekSelector';
import { AttendanceType, CreateFormSchema, PeriodForSubmit } from '../page';
import { addMinutes, format, setHours, setMinutes, setSeconds } from 'date-fns';
import { Period, PeriodType } from '../../[cid]/_store/PeriodsStore';

/**
 * TODO: 첫 교시 시간으로부터 설정한 교시 시간, 쉬는 시간, 교시 반복 횟수가 다음 날 새벽 5시(초기화 시간)을 넘기지 않는지 확인 필요
 */

const formSchema = z.object({
  timetableName: z.string().min(2, '시간표 이름을 2글자 이상으로 지어주세요.'),
  dayOfWeeks: z.number().array().min(1, '요일을 최소 1개 선택해주세요.'),
  timetableStartTime: z.string(),
  timetableDuration: z.coerce.number(),
  timetableRecessDuration: z.coerce.number(),
  timetablePeriodRepeat: z.coerce.number(),
  defaultAttendance: z.enum(['yes', 'no']),
});

export type TimetableFormRequest = Pick<
  CreateFormSchema,
  | 'timetableName'
  | 'dayOfWeeks'
  | 'timetableStartTime'
  | 'timetableDuration'
  | 'timetableRecessDuration'
  | 'timetablePeriodRepeat'
  | 'defaultAttendance'
  | 'periods'
>;

type TimetableFormProp = {
  defaultValues: TimetableFormRequest;
  onSuccess: (data: TimetableFormRequest) => void;
};

export function TimetableForm({ defaultValues, onSuccess }: TimetableFormProp) {
  const form = useForm<TimetableFormRequest>({
    resolver: zodResolver(formSchema),
    defaultValues: { ...defaultValues },
  });

  const handleSubmitAfterValidation = (data: TimetableFormRequest) => {
    const [hours, minutes] = data.timetableStartTime.split(':').map(Number);

    const baseTime = setSeconds(setMinutes(setHours(new Date(), hours), minutes), 0);
    const newPeriods: PeriodForSubmit[] = [];

    let lastTime = baseTime;

    for (let i = 0; i < data.timetablePeriodRepeat * 2; i += 2) {
      const newPeriod: PeriodForSubmit = {
        id: i,
        type: PeriodType.STUDY,
        name: `교시${Math.floor(i / 2) + 1}`,
        startTime: format(lastTime, 'HH:mm'),
        duration: data.timetableDuration,
        isAttendanceRequired: data.defaultAttendance,
      };

      newPeriods.push(newPeriod);
      lastTime = addMinutes(lastTime, data.timetableDuration);

      const newRecess: PeriodForSubmit = {
        id: i + 1,
        type: PeriodType.RECESS,
        name: `쉬는 시간`,
        startTime: format(lastTime, 'HH:mm'),
        duration: data.timetableRecessDuration,
        isAttendanceRequired: AttendanceType.NO,
      };

      newPeriods.push(newRecess);
      lastTime = addMinutes(lastTime, data.timetableRecessDuration);
    }

    onSuccess({ ...data, periods: newPeriods });
  };

  return (
    <Form {...form}>
      <form className="w-full flex-1 flex" onSubmit={form.handleSubmit(handleSubmitAfterValidation)}>
        <fieldset className="flex flex-col border-none space-y-2 md:space-y-6 flex-1 w-full">
          <TimetableNameField control={form.control} />
          <DayOfWeeksField control={form.control} />
          <TimetableStartTimeField control={form.control} />
          <TimetableDurationField control={form.control} />
          <TimetableRecessDurationField control={form.control} />
          <TimetablePeriodRepeatField control={form.control} />
          <DefaultAttendanceField control={form.control} />

          <SubmitButton>다음</SubmitButton>
        </fieldset>
      </form>
    </Form>
  );
}

const TimetableNameField = ({ control }: { control: Control<TimetableFormRequest, any> }) => {
  return (
    <FormField
      control={control}
      name="timetableName"
      render={({ field }) => (
        <FormItem>
          <FormLabel>시간표 이름*</FormLabel>
          <FormDescription>생성할 시간표 이름을 알려주세요</FormDescription>
          <FormControl>
            <Input placeholder="너만 오면 바로 ㄱ" type="text" {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

const DayOfWeeksField = ({ control }: { control: Control<TimetableFormRequest, any> }) => {
  return (
    <>
      <FormField
        control={control}
        name="dayOfWeeks"
        render={({ field }) => (
          <FormItem>
            <FormLabel>요일*</FormLabel>
            <FormDescription>반복할 요일을 선택해주세요.</FormDescription>

            <DayOfWeekSelector defaultValues={field.value} onChange={field.onChange} />
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  );
};

const TimetableStartTimeField = ({ control }: { control: Control<TimetableFormRequest, any> }) => {
  return (
    <>
      <FormField
        control={control}
        name="timetableStartTime"
        render={({ field }) => (
          <FormItem>
            <FormLabel>첫 교시 시작 시간</FormLabel>
            <FormDescription>시간표를 시작할 시간을 설정해주세요.</FormDescription>

            <FormControl>
              <input
                {...field}
                type="time"
                className="bg-gray-50 border leading-none border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                step={300}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  );
};

const TimetableDurationField = ({ control }: { control: Control<TimetableFormRequest, any> }) => {
  return (
    <>
      <FormField
        control={control}
        name="timetableDuration"
        render={({ field }) => (
          <FormItem>
            <FormLabel>교시 시간</FormLabel>
            <FormDescription>한 교시를 얼마나 진행할지 설정해주세요.</FormDescription>

            <FormControl>
              <input
                {...field}
                type="number"
                className="bg-gray-50 border leading-none border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                min={5}
                step={5}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  );
};

const TimetableRecessDurationField = ({ control }: { control: Control<TimetableFormRequest, any> }) => {
  return (
    <>
      <FormField
        control={control}
        name="timetableRecessDuration"
        render={({ field }) => (
          <FormItem>
            <FormLabel>쉬는 시간</FormLabel>
            <FormDescription>각 교시 사이 쉬는 시간을 얼마나 진행할지 설정해주세요.</FormDescription>

            <FormControl>
              <input
                {...field}
                type="number"
                className="bg-gray-50 border leading-none border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                min={5}
                step={5}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  );
};

const TimetablePeriodRepeatField = ({ control }: { control: Control<TimetableFormRequest, any> }) => {
  return (
    <>
      <FormField
        control={control}
        name="timetablePeriodRepeat"
        render={({ field }) => (
          <FormItem>
            <FormLabel>교시 반복 횟수</FormLabel>
            <FormDescription>총 몇 교시를 진행할지 설정해주세요.</FormDescription>

            <FormControl>
              <input
                {...field}
                type="number"
                className="bg-gray-50 border leading-none border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                min={1}
                step={1}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  );
};

const MotionedIndicator = motion(RadioGroup.Indicator);

const DefaultAttendanceField = ({ control }: { control: Control<TimetableFormRequest, any> }) => {
  return (
    <>
      <FormField
        control={control}
        name="defaultAttendance"
        render={({ field }) => (
          <FormItem>
            <FormLabel>매 교시 출석체크 여부</FormLabel>
            <FormDescription>매 교시 시작 후 5분 동안 출석체크를 진행할지 선택해주세요.</FormDescription>

            <FormControl>
              <RadioGroup.Root
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

const SubmitButton = ({ children }: PropsWithChildren) => {
  return (
    <div className="flex-1 flex flex-col justify-end">
      <Button type="submit" className="w-full rounded-full">
        {children}
      </Button>
    </div>
  );
};
