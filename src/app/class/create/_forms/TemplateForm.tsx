'use client';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import { useState } from 'react';

import fox from '@/static/images/fox.jpg';
import { CreateFormSchema } from '../page';

// TODO: types/model로 분리
export type TemplateData = {
  id: number;
  name: string;
  description: string;
  image: string;
};

const templateDataList: TemplateData[] = [
  {
    id: 0,
    name: '수능 시간표',
    description: '수능 시간표에 대한 설명입니다.',
    image: fox.src,
  },
  {
    id: 1,
    name: '한국사 시간표',
    description: '한국사 시간표에 대한 설명입니다.',
    image: fox.src,
  },
  {
    id: 2,
    name: '빈 시간표',
    description: '시간표를 직접 설정할게요.',
    image: fox.src,
  },
];

type TemplateFormProp = {
  defaultValues: Pick<CreateFormSchema, 'templateId'>;
  onSuccess: (data: Pick<CreateFormSchema, 'templateId'>) => void;
};

export function TemplateForm({ defaultValues, onSuccess }: TemplateFormProp) {
  const [selectedId, setSelectedId] = useState(defaultValues.templateId);

  return (
    <section className="w-full flex-1 flex flex-col gap-3">
      <div>
        <h4 className="font-bold mb-3">템플릿 목록</h4>
        <TemplateList list={templateDataList} selectedId={selectedId} onSelect={(id) => setSelectedId(id)} />
      </div>

      <div className="flex-1 flex flex-col justify-end">
        <Button
          type="button"
          className="w-full rounded-full"
          onClick={() => onSuccess({ templateId: selectedId } as Pick<CreateFormSchema, 'templateId'>)}>
          다음
        </Button>
      </div>
    </section>
  );
}

const TemplateList = ({
  selectedId,
  onSelect,
  list,
}: {
  list: TemplateData[];
  selectedId: number;
  onSelect: (selectedId: number) => void;
}) => {
  return (
    <ul className="flex flex-col gap-3">
      {list.map((templateData) => (
        <TemplateItem
          key={templateData.id}
          {...templateData}
          isSelected={templateData.id === selectedId}
          onSelect={onSelect}
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
