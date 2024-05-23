import { GongsilockLogo } from '@/components/GongsilockLogo/GongsilockLogo';
import { HeadingWithDescription } from '@/components/HeadingWithDescription/HeadingWithDescription';
import { CirclePlus, CirclePlusIcon, User } from 'lucide-react';
import Link from 'next/link';
import { Suspense } from 'react';
import { fetchMyClazzList } from '../actions';
import { FetchStatus } from '@/types/api';
import { ClassItem } from '@/types/clazz';

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

const ClassList = async () => {
  const { status, data } = await fetchMyClazzList();

  if (status === FetchStatus.FAIL) {
    throw new Error(data.errorMessage);
  }

  if (status === FetchStatus.NETWORK_ERROR) {
    throw new Error(data.message);
  }

  if (status === FetchStatus.UNKNOWN_ERROR) {
    throw new Error(data);
  }

  const classLists = data;

  const hasNoClass = classLists.length === 0;

  return (
    <ul className="flex flex-col gap-3">
      {hasNoClass && <span>가입한 반이 없어용😇</span>}
      {classLists.map((classItem) => (
        <Link key={classItem.id} href={`/class/${classItem.id}/dashboard`}>
          <ClassItemPresenter {...classItem} />
        </Link>
      ))}
      <CreateNewClassButton />
    </ul>
  );
};

type ClassItemPresenterProp = ClassItem;

const ClassItemPresenter = ({ clazzIcon, clazzName, isOwnd, memberCount }: ClassItemPresenterProp) => {
  return (
    <li className="flex flex-row gap-6 px-4 py-3 border border-gray-200 rounded-full">
      <span>{clazzIcon}</span>

      <div className="flex flex-row gap-1 items-center flex-1">
        <span>{clazzName}</span>
        {isOwnd && <ManageBadge />}
      </div>

      <div className="flex flex-row justify-center items-center gap-1">
        <User className="size-4" />
        <span>
          {/* {currentPeopleCount}/{maxPeopleCount} */}
          {memberCount}
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
      href="/class/create"
      className="flex flex-row justify-center items-center gap-1 rounded-full border border-green-600 border-dashed py-3 text-green-600">
      <CirclePlus className="size-4" />
      새로운 반을 만드시겠어요?
    </a>
  );
};
