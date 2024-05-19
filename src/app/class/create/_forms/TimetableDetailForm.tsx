import { useForm, useWatch } from 'react-hook-form';
import { AttendanceType, CreateFormSchema, PeriodForSubmit } from '../page';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { ZodBoolean, z } from 'zod';
import { Clock, UserRoundCheck } from 'lucide-react';
import { Period, PeriodType } from '../../[cid]/_store/PeriodsStore';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { PropsWithChildren, useState } from 'react';
import { cn } from '@/lib/utils';
import { PeriodForm } from './PeriodForm';

const formSchema = z.object({
  periods: z
    .object({
      id: z.number(),
      name: z.string(),
      startTime: z.string(),
      duration: z.number(),
      isAttendacneRequired: z.enum(['yes', 'no']),
    })
    .array(),
});

export type TimetableDetailRequest = Pick<CreateFormSchema, 'periods'>;

type TimetableDetailFormProp = {
  defaultValues: TimetableDetailRequest;
  onSuccess: (data: TimetableDetailRequest) => void;
};

export function TimetableDetailForm({ defaultValues, onSuccess }: TimetableDetailFormProp) {
  const form = useForm<TimetableDetailRequest>({
    resolver: zodResolver(formSchema),
    defaultValues: { ...defaultValues },
  });

  const periods = form.watch('periods');

  const [currentPeriodId, setCurrentPeriodId] = useState(0);
  const currentPeriod = periods.find((period) => period.id === currentPeriodId)!;

  const handleSubmitAfterValidation = () => {
    onSuccess(form.getValues());
  };

  return (
    <section className="flex flex-col border-none space-y-2 md:space-y-6 flex-1 w-full">
      <div className="flex flex-row gap-10">
        <div className="space-y-4 flex-1">
          <div className="space-y-2">
            <p className="font-semibold text-lg">교시 목록</p>
            <span>교시를 선택하면 설정할 수 있어요.</span>
          </div>

          <ul className="space-y-2 w-full">
            {periods
              .sort((a, b) => a.id - b.id)
              .map((period) => (
                <PeriodItem
                  key={period.id}
                  {...period}
                  isSelected={period.id === currentPeriodId}
                  onClick={(id) => setCurrentPeriodId(id)}
                />
              ))}
          </ul>
        </div>

        {/* TODO: Modal in mobile */}
        <div className="flex-1 self-start sticky top-6 space-y-16">
          <PeriodForm
            defaultValues={currentPeriod}
            onSuccess={(data) => {
              form.setValue('periods', [
                ...periods.filter((period) => period.id !== currentPeriodId),
                { ...currentPeriod, ...data },
              ]);
            }}
          />
        </div>
      </div>

      <SubmitButton onClick={handleSubmitAfterValidation}>반 만들기</SubmitButton>
    </section>
  );
}

const SubmitButton = ({ children, onClick }: PropsWithChildren<{ onClick: () => void }>) => {
  return (
    <div className="flex-1 flex flex-col justify-end">
      <Button type="button" className="w-full rounded-full" onClick={onClick}>
        {children}
      </Button>
    </div>
  );
};

//
type PeriodItemProp = PeriodForSubmit & {
  isSelected: boolean;
  onClick: (id: number) => void;
};

const PeriodItem = ({
  duration,
  id,
  type,
  isAttendanceRequired,
  name,
  startTime,
  isSelected,
  onClick,
}: PeriodItemProp) => {
  const isStudyType = type === PeriodType.STUDY;
  const shouldShowCheckIcon = isAttendanceRequired === AttendanceType.YES;

  return (
    <li
      role="button"
      className="flex flex-row rounded overflow-hidden w-full cursor-pointer group hover:shadow-dayOfWeek hover:scale-[1.01] active:scale-[0.99] transition-transform"
      onClick={() => onClick(id)}>
      <div
        className={cn('w-1 bg-gray-200 group-hover:bg-green-200 transition-colors', {
          ['bg-green-400']: isSelected,
        })}
      />
      <div className="bg-white space-y-2 px-3 py-2 flex-1">
        <div className="flex flex-row justify-between items-end">
          <div className="flex flex-row items-center gap-1">
            <span className="font-medium">{name}</span>
            {shouldShowCheckIcon && <UserRoundCheck className="size-4" />}
          </div>

          {isStudyType && <span className="text-[.875rem] text-gray-600">{Math.floor(id / 2) + 1}교시</span>}
        </div>

        <div className="flex flex-row gap-1 items-center">
          <Clock className="size-4" />
          <span>
            {startTime} · {duration}분
          </span>
        </div>
      </div>
    </li>
  );
};
