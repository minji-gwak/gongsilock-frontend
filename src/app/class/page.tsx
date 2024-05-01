import { GongsilockLogo } from '@/components/GongsilockLogo/GongsilockLogo';
import { HeadingWithDescription } from '@/components/HeadingWithDescription/HeadingWithDescription';
import { CirclePlus, CirclePlusIcon, User } from 'lucide-react';
import Link from 'next/link';
import { Suspense } from 'react';

// TODO: API 명세에 맞게 types/models 생성
type ClassItem = {
  id: number;
  icon: string;
  name: string;
  isManaged: boolean;
  currentPeopleCount: number;
  maxPeopleCount: number;
};

// 임시 데이터
const classListData: ClassItem[] = [
  {
    id: 0,
    icon: '😇',
    name: '우리 열심히 공부하자',
    isManaged: true,
    currentPeopleCount: 2,
    maxPeopleCount: 10,
  },
  {
    id: 1,
    icon: '🔥',
    name: '프론트엔드 모각코',
    isManaged: false,
    currentPeopleCount: 5,
    maxPeopleCount: 10,
  },
];

// TODO: action으로 이동
const getClassList = async (): Promise<ClassItem[]> => {
  'use server';

  return await new Promise((resolve) => {
    setTimeout(() => {
      resolve(classListData);
    }, 1500);
  });
};

export default function Page() {
  return (
    <section className="py-[4.5rem] px-6 max-w-[48rem] mx-auto space-y-[3rem] md:p-10">
      <GongsilockLogo />
      <HeadingWithDescription heading="반 선택" description="참여할 반을 선택해주세요." />

      <div>
        <h6 className="font-semibold mb-3">반 목록</h6>

        {/* TODO: ErrorBoundary */}
        <Suspense fallback={<div>반 목록을 불러오는 중입니다...</div>}>
          <ClassList />
        </Suspense>
      </div>
    </section>
  );
}

// TODO: 파일 분리
const ClassList = async () => {
  const classListData = await getClassList();

  return (
    <ul className="flex flex-col gap-3">
      {classListData.map((classItemData) => (
        <Link key={classItemData.id} href={`/class/${classItemData.id}/dashboard`}>
          <ClassItemPresenter {...classItemData} />
        </Link>
      ))}
      <CreateNewClassButton />
    </ul>
  );
};

type ClassItemPresenterProp = ClassItem;

const ClassItemPresenter = ({ currentPeopleCount, icon, maxPeopleCount, name, isManaged }: ClassItemPresenterProp) => {
  return (
    <li className="flex flex-row gap-6 px-4 py-3 border border-gray-200 rounded-full">
      <span>{icon}</span>

      <div className="flex flex-row gap-1 items-center flex-1">
        <span>{name}</span>
        {isManaged && <ManageBadge />}
      </div>

      <div className="flex flex-row justify-center items-center gap-1">
        <User className="size-4" />
        <span>
          {currentPeopleCount}/{maxPeopleCount}
        </span>
      </div>
    </li>
  );
};

const ManageBadge = () => {
  return <span className="text-[.75rem] px-1 py-[.125rem] text-white bg-green-700 rounded h-fit">운영</span>;
};

const CreateNewClassButton = () => {
  return (
    <a
      href="/class/create/step/required"
      className="flex flex-row justify-center items-center gap-1 rounded-full border border-green-600 border-dashed py-3 text-green-600">
      <CirclePlus className="size-4" />
      새로운 반을 만드시겠어요?
    </a>
  );
};
