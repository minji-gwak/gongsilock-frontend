'use client';

import { GongsilockLogo } from '@/components/GongsilockLogo/GongsilockLogo';
import { HeadingWithDescription } from '@/components/HeadingWithDescription/HeadingWithDescription';
import { cn } from '@/lib/utils';
import { Check, Ellipsis } from 'lucide-react';
import { Fragment, useRef, useState } from 'react';
import { Period, PeriodType } from '../[cid]/_store/PeriodsStore';
import { DayOfWeek } from '../[cid]/_store/TimetableStore';
import { RequiredForm } from './_forms/RequiredForm';
import { TemplateForm } from './_forms/TemplateForm';
import { TimetableDetailForm } from './_forms/TimetableDetailForm';
import { TimetableForm } from './_forms/TimetableForm';
import { useRouter } from 'next/navigation';
import { CreateClazzWithTimetableRequest, createClazzWithTimetable } from '@/app/actions';
import { FetchStatus } from '@/types/api';
// import { useRouter } from 'next/router';

// TODO: 배포 후에 초기 로딩 시간 측정해보고 좀 많이 크면 Code Spliting 해보기
// const RequiredStep = dynamic(() => import('./_forms/RequiredForm').then((mod) => mod.RequiredForm), { ssr: false });

// Radio Input은 string이라 일단 요렇게 처리해보고 ..
export type PeriodForSubmit = Omit<Period, 'startTime' | 'isAttendanceRequired'> & {
  startTime: string;
  isAttendanceRequired: AttendanceType;
};

export enum AttendanceType {
  YES = 'yes',
  NO = 'no',
}

export type CreateFormSchema = {
  // RequiredStep
  name: string;
  emoji: string;
  description: string;

  // TemplateStep
  templateId: number;

  // TimetableStep
  timetableName: string;
  dayOfWeeks: DayOfWeek[];
  timetableStartTime: string;
  timetableDuration: number;
  timetableRecessDuration: number;
  timetablePeriodRepeat: number;
  defaultAttendance: AttendanceType;

  // TimetableDetailStep
  periods: PeriodForSubmit[];
};

const initialFormData: CreateFormSchema = {
  // RequiredStep
  name: '',
  emoji: '',
  description: '',

  // TemplateStep
  templateId: 0,

  // TimetableStep
  timetableName: '',
  dayOfWeeks: [DayOfWeek.MONDAY, DayOfWeek.TUESDAY, DayOfWeek.WEDNESDAY, DayOfWeek.THURSDAY, DayOfWeek.FRIDAY],
  timetableStartTime: '09:00',
  timetableDuration: 50,
  timetableRecessDuration: 10,
  timetablePeriodRepeat: 8,
  defaultAttendance: AttendanceType.YES,

  // TimetableDetailStep
  periods: [
    {
      id: 0,
      name: '오전1',
      type: PeriodType.STUDY,
      duration: 50,
      startTime: '09:00',
      isAttendanceRequired: AttendanceType.YES,
    },
  ],
};

enum CreateStep {
  REQUIRED,
  TEMPLATE,
  TIMETABLE,
  TIMTETABLE_DETAIL,
  SUBMIT,
}

type StepInfo = {
  stepId: CreateStep;
  title: string;
  description: string;
};

const createStepInfo: StepInfo[] = [
  {
    stepId: CreateStep.REQUIRED,
    title: '반 만들기',
    description: '반를 만들어서 머시기 머시기 해보세요.',
  },
  {
    stepId: CreateStep.TEMPLATE,
    title: '템플릿 선택',
    description: '템플릿를 선택해보세요.',
  },
  {
    stepId: CreateStep.TIMETABLE,
    title: '시간표 설정',
    description: '시간표를 설정해보세요.',
  },
  {
    stepId: CreateStep.TIMTETABLE_DETAIL,
    title: '세부 설정',
    description: '세부를 설정해보세요.',
  },
];

export default function Page() {
  const router = useRouter();

  const [formDataForSubmit, setFormDataForSubmit] = useState(initialFormData);
  const [currentStepId, setCurrentStepId] = useState<CreateStep>(CreateStep.REQUIRED);

  const currentStepInfo = createStepInfo.find((stepInfo) => stepInfo.stepId === currentStepId)!;
  const lastStepId = useRef(currentStepId);

  const isRequiredStep = currentStepId === CreateStep.REQUIRED;
  const isTemplateStep = currentStepId === CreateStep.TEMPLATE;
  const isTimetableStep = currentStepId === CreateStep.TIMETABLE;
  const isTimetableDetailStep = currentStepId === CreateStep.TIMTETABLE_DETAIL;

  const updateFormData = (data: Partial<CreateFormSchema>) => {
    setFormDataForSubmit({ ...formDataForSubmit, ...data });
  };

  const updateCurrentStepId = (nextStep: CreateStep) => {
    setCurrentStepId(nextStep);

    if (lastStepId.current < nextStep) {
      lastStepId.current = nextStep;
    }
  };

  const handleNext = async ({ data, nextStep }: { data: Partial<CreateFormSchema>; nextStep: CreateStep }) => {
    if (nextStep === CreateStep.SUBMIT) {
      const submitData = { ...formDataForSubmit, ...data } as CreateFormSchema;

      const requestData: CreateClazzWithTimetableRequest = {
        clazzName: submitData.name,
        clazzDescription: submitData.description,
        clazzIcon: submitData.emoji,
        timetableRequest: {
          timetableName: submitData.timetableName,
          timetableDays: submitData.dayOfWeeks,
          periodRequests: submitData.periods.map((period) => ({
            periodName: period.name,
            periodDuration: period.duration,
            periodStartTime: period.startTime,
            isAttendanceRequired: period.isAttendanceRequired === AttendanceType.YES ? true : false,
          })),
        },
      };

      const { status, data: response } = await createClazzWithTimetable(requestData);

      // TODO: error handling
      if (status === FetchStatus.FAIL) {
        console.error(response.errorMessage);
        return;
      }

      if (status === FetchStatus.NETWORK_ERROR) {
        console.error('[NETWORK_ERROR]: handleNext, ', response.message);
        return;
      }

      if (status === FetchStatus.UNKNOWN_ERROR) {
        console.error('[UNKNOWN_ERROR]: handleNext, ', response);
        return;
      }

      router.push(`/class/create/complete?clazzId=${response.clazzLink}`);

      return;
    }

    updateFormData(data);
    updateCurrentStepId(nextStep);
  };

  return (
    <section className="full-container">
      <GongsilockLogo />

      <menu className="flex flex-row justify-between w-full items-center">
        {createStepInfo.map((stepInfo, index) => (
          <Fragment key={stepInfo.stepId}>
            <Step
              step={stepInfo.stepId + 1}
              title={stepInfo.title}
              isCurrentStep={currentStepId === stepInfo.stepId}
              isDoneStep={stepInfo.stepId < currentStepId}
              isClickable={stepInfo.stepId <= lastStepId.current}
              onClick={() => updateCurrentStepId(stepInfo.stepId)}
            />
            {index !== createStepInfo.at(-1)!.stepId && <StepSeparate isProgressed={stepInfo.stepId < currentStepId} />}
          </Fragment>
        ))}
      </menu>

      <section className="flex flex-col flex-1 space-y-6">
        <HeadingWithDescription heading={currentStepInfo.title} description={currentStepInfo.description} />

        {isRequiredStep && <RequiredForm defaultValues={formDataForSubmit} onSuccess={(data) => handleNext({ data, nextStep: CreateStep.TEMPLATE })} />}
        {isTemplateStep && <TemplateForm defaultValues={formDataForSubmit} onSuccess={(data) => handleNext({ data, nextStep: CreateStep.TIMETABLE })} />}
        {isTimetableStep && <TimetableForm defaultValues={formDataForSubmit} onSuccess={(data) => handleNext({ data, nextStep: CreateStep.TIMTETABLE_DETAIL })} />}
        {isTimetableDetailStep && <TimetableDetailForm defaultValues={formDataForSubmit} onSuccess={(data) => handleNext({ data, nextStep: CreateStep.SUBMIT })} />}
      </section>
    </section>
  );
}

type StepProp = {
  step: number;
  title: string;
  isCurrentStep: boolean;
  isDoneStep: boolean;
  isClickable: boolean;
  onClick: () => void;
};

const Step = ({ step, title, isCurrentStep, isDoneStep, onClick, isClickable }: StepProp) => {
  const isYetStep = !(isCurrentStep || isDoneStep);
  const shouldShowDoneIcon = isDoneStep;

  return (
    <li
      className={cn('flex flex-col gap-1 justify-center items-center', {
        ['cursor-pointer']: isClickable,
        ['cursor-not-allowed']: !isClickable,
      })}
      onClick={() => isClickable && onClick()}>
      <span
        className={cn('size-12 rounded-full border grid place-items-center text-[1.125rem] font-semibold transition-colors', {
          ['border-green-600 text-green-900 bg-green-50']: isCurrentStep,
          ['border-green-400 text-white bg-green-400']: isDoneStep,
          ['border-green-300 text-gray-500 bg-white']: isYetStep,
        })}>
        {!shouldShowDoneIcon && step}
        {shouldShowDoneIcon && <Check className="size-[1.125rem]" />}
      </span>
      <span
        className={cn({
          ['font-semibold text-green-900']: isCurrentStep,
          ['font-semibold text-green-700']: isDoneStep,
          ['text-gray-500']: isYetStep,
        })}>
        {title}
      </span>
    </li>
  );
};

type StepSeparteProp = {
  isProgressed: boolean;
};
const StepSeparate = ({ isProgressed }: StepSeparteProp) => {
  return (
    <Ellipsis
      className={cn('hidden md:block', {
        ['text-gray-300']: !isProgressed,
        ['text-green-600']: isProgressed,
      })}
    />
  );
};
