import Image from 'next/image';
import { RankItem } from '../../../_actions/actions';
import { cn } from '@/lib/utils';
import { Crown } from 'lucide-react';

export enum TopRank {
  FIRST,
  SECOND,
  THIRD,
}

type TopRankItemProps = {
  rank: TopRank;
} & RankItem;

const ImageSizeMap = [72, 64, 48];

export const TopRankItem = ({ focusTime, id, isFocusing, name, profileURL, rank }: TopRankItemProps) => {
  const isFirst = rank == TopRank.FIRST;
  const durationLabel = getDurationLabel(focusTime);

  return (
    <div className="flex-1 flex justify-center items-end">
      <div className="flex flex-col justify-center items-center gap-3">
        <DoubleBorderImage src={profileURL} rank={rank} />

        <div
          className={cn('flex flex-row items-center gap-1', {
            ['text-green-400']: isFirst,
          })}>
          {isFirst && <Crown className="size-4" />}
          <p className="text-base font-semibold leading-none">{name}</p>
        </div>

        <p
          className={cn('text-base leading-none', {
            [' font-semibold text-green-400']: isFirst,
          })}>
          {durationLabel}
        </p>
      </div>
    </div>
  );
};

const DoubleBorderImage = ({ src, rank }: { src: string; rank: TopRank }) => {
  const isFirst = rank == TopRank.FIRST;
  const isSeconds = rank == TopRank.SECOND;
  const isThird = rank == TopRank.THIRD;

  return (
    <div className={cn('rounded-full overflow-hidden border-[.1875rem] border-green-400')}>
      <div className={cn('rounded-full overflow-hidden border-[.1875rem] border-white')}>
        <Image
          className={cn('object-cover rounded overflow-hidden', {
            ['size-[4.5rem]']: isFirst,
            ['size-[4rem]']: isSeconds,
            ['size-[3rem]']: isThird,
          })}
          src={src}
          width={ImageSizeMap[rank]}
          height={ImageSizeMap[rank]}
          alt="profile"
        />
      </div>
    </div>
  );
};

const getDurationLabel = (duration: number) => {
  const hours = Math.floor(duration / 3600);
  const minutes = Math.floor((duration % 3600) / 60);
  const seconds = duration % 60;

  const hoursText = hours !== 0 ? `${hours}시간` : '';
  const minutesText = minutes !== 0 ? `${minutes}분` : '';
  const secondsText = seconds !== 0 ? `${seconds}초` : '';

  return [hoursText, minutesText, hours === 0 ? secondsText : ''].join(' ');
};
