'use client';

import { cn } from '@/lib/utils';
import Image from 'next/image';
import { useState } from 'react';

// TODO: types/model로 분리
export type TemplateData = {
  id: number;
  name: string;
  description: string;
  image: string;
};

export const TemplateList = ({ list }: { list: TemplateData[] }) => {
  const [selectedId, setSelectedId] = useState(0);

  return (
    <ul className="flex flex-col gap-3">
      {list.map((templateData) => (
        <TemplateItem
          key={templateData.id}
          {...templateData}
          isSelected={templateData.id === selectedId}
          onSelect={(id) => setSelectedId(id)}
        />
      ))}
    </ul>
  );
};

type TemplateItemProp = {
  isSelected: boolean;
  onSelect: (id: number) => void;
} & TemplateData;

const TemplateItem = ({ isSelected, id, description, image, name, onSelect }: TemplateItemProp) => {
  return (
    <li
      className={cn('flex flex-row px-8 py-6 gap-3 border rounded cursor-pointer', {
        ['border-green-400 bg-green-50 text-green-800']: isSelected,
        ['border-gray-200']: !isSelected,
      })}
      onClick={() => onSelect(id)}>
      <Image src={image} width={1084} height={720} alt="fox" className="object-cover size-12 rounded" />

      <div>
        <p className="font-bold">{name}</p>
        <span>{description}</span>
      </div>
    </li>
  );
};
