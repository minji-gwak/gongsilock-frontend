'use client';

import { cn } from '@/lib/utils';
import React, { PropsWithChildren, useState } from 'react';

type DayOfWeekToggleProps = {
  value: number;
  isActive: boolean;
  onToggle: (value: number) => void;
};

const dayOfWeeks = ['월', '화', '수', '목', '금', '토', '일'];

export const DayOfWeekToggle = ({ value, onToggle, isActive }: DayOfWeekToggleProps) => {
  return (
    <button
      className={cn('border size-12 rounded flex-1 transition-colors', {
        ['border-green-600 bg-green-50 shadow-dayOfWeek font-medium']: isActive,
        ['border-gray-200 text-green-900']: !isActive,
      })}
      onClick={() => onToggle && onToggle(value)}>
      {dayOfWeeks[value]}
    </button>
  );
};

type DayOfWeekToggleGroupProps = {
  onChange: (dayOfWeeks: number[]) => void;
};
export const DayOfWeekToggleGroup = ({ children, onChange }: PropsWithChildren<DayOfWeekToggleGroupProps>) => {
  // 활성화된 토글 버튼들의 값 배열을 관리합니다.
  const [activeDays, setActiveDays] = useState([]);

  const handleToggle = (value: number) => {
    const currentIndex = activeDays.indexOf(value);
    const newActiveDays = [...activeDays];

    // 값이 배열에 없으면 추가하고, 있으면 제거합니다.
    if (currentIndex === -1) {
      newActiveDays.push(value);
    } else {
      newActiveDays.splice(currentIndex, 1);
    }

    setActiveDays(newActiveDays);

    // 변경된 값 배열을 상위 컴포넌트로 전달합니다.
    onChange(newActiveDays);
  };

  // React.Children.map을 사용하여 각 자식에게 추가 기능을 주입합니다.
  const toggles = React.Children.map(children, (child) => {
    if (React.isValidElement(child)) {
      return React.cloneElement(child, {
        onToggle: handleToggle,
        isActive: activeDays.includes(child.props.value),
      });
    } else {
      return child;
    }
  });

  return <ol className="w-full flex flex-row gap-3">{toggles}</ol>;
};
