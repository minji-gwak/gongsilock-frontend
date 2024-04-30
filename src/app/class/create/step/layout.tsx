import { GongsilockLogo } from '@/components/GongsilockLogo/GongsilockLogo';
import { cn } from '@/lib/utils';
import { Check, Ellipsis } from 'lucide-react';

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <section className="w-full max-w-[48rem] mx-auto py-[4.5rem] space-y-[3rem] px-6 min-h-dvh flex flex-col">
      <GongsilockLogo />

      {/**
       * Note: Route 기반으로 할지, Context 기반으로 할지 고민해보기
       * */}
      <ol className="flex flex-row justify-between w-full items-center">
        <Step step={1} title="반 만들기" isCurrentStep={true} isDoneStep={false} />
        <StepSeparate isProgressed={false} />
        <Step step={2} title="템플릿 선택" isCurrentStep={false} isDoneStep={false} />
        <StepSeparate isProgressed={false} />
        <Step step={3} title="시간표 설정" isCurrentStep={false} isDoneStep={false} />
        <StepSeparate isProgressed={false} />
        <Step step={4} title="세부 설정" isCurrentStep={false} isDoneStep={false} />
      </ol>

      {children}
    </section>
  );
}

type StepProp = {
  step: number;
  title: string;
  isCurrentStep: boolean;
  isDoneStep: boolean;
};

const Step = ({ step, title, isCurrentStep, isDoneStep }: StepProp) => {
  const isYetStep = !(isCurrentStep || isDoneStep);
  const shouldShowDoneIcon = isDoneStep;

  return (
    <li className="flex flex-col gap-1 justify-center items-center">
      <span
        className={cn('size-12 rounded-full border grid place-items-center text-[1.125rem] font-semibold', {
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
