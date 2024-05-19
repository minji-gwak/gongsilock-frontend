/**
 * DayOfWeekSelector
 * Description: 요일을 선택하는 토글 버튼입니다.
 * list로 요일 목록을 따로 받을까 했는데, 이름에서부터 목록이 특정이 되므로 필요가 없다고 판단함.
 * Usage: <DayOfWeekSelector defaultValues={[0, 1, 2, 3, 4]} onChange={(dayOfWeeks) => console.log({ dayOfWeeks })} />
 */

import { cn } from '@/lib/utils';
import { useRef } from 'react';
import { DayOfWeek } from '../../[cid]/_store/TimetableStore';

const dayOfWeeks = [
  DayOfWeek.MONDAY,
  DayOfWeek.TUESDAY,
  DayOfWeek.WEDNESDAY,
  DayOfWeek.THURSDAY,
  DayOfWeek.FRIDAY,
  DayOfWeek.SATURDAY,
  DayOfWeek.SUNDAY,
];

const dayOfWeekLabels = ['월', '화', '수', '목', '금', '토', '일'];

type DayOfWeekSelectorProps = {
  defaultValues: DayOfWeek[];
  onChange: (dayOfWeeks: DayOfWeek[]) => void;
};

export const DayOfWeekSelector = ({ defaultValues, onChange }: DayOfWeekSelectorProps) => {
  const selectedDayOfWeeks = useRef(new Set(defaultValues));

  const handleToggle = (value: DayOfWeek) => {
    const hasDayOfWeek = selectedDayOfWeeks.current.has(value);

    if (hasDayOfWeek) {
      selectedDayOfWeeks.current.delete(value);
    } else {
      selectedDayOfWeeks.current.add(value);
    }

    onChange([...Array.from(selectedDayOfWeeks.current.values())]);
  };

  return (
    <menu className="w-full flex flex-row gap-3">
      {dayOfWeeks.map((dayOfWeek) => (
        <DayOfWeekToggle
          key={dayOfWeek}
          value={dayOfWeek}
          onToggle={handleToggle}
          isActive={selectedDayOfWeeks.current.has(dayOfWeek)}
        />
      ))}
    </menu>
  );
};

type DayOfWeekToggleProps = {
  value: DayOfWeek;
  isActive: boolean;
  onToggle: (value: DayOfWeek) => void;
};

export const DayOfWeekToggle = ({ value, onToggle, isActive }: DayOfWeekToggleProps) => {
  return (
    <li
      role="button"
      className={cn('border size-12 rounded flex-1 transition-colors flex justify-center items-center', {
        ['border-green-600 bg-green-50 shadow-dayOfWeek font-medium']: isActive,
        ['border-gray-200 text-green-900']: !isActive,
      })}
      onClick={() => onToggle && onToggle(value)}>
      {dayOfWeekLabels[value]}
    </li>
  );
};
