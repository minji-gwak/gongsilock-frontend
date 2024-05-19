import { cn } from '@/lib/utils';
import { RankItem, getFocusRanking } from '../../../_actions/actions';
import { TopRank, TopRankItem } from './TopRankItem';

/**
 * Note: Table 태그에 제약이 넘 많아서 ... 아마 나중에 다른 걸로 바꿀 듯
 * row에 rounded edge가 안 먹는다
 */

export const FocusRandking = async () => {
  const { status, payload } = await getFocusRanking();

  if (status === 500) {
    throw new Error('focusRanking 500');
  }

  const { rankingList } = payload;

  return (
    <div className="space-y-6">
      <TopRankList topRanks={rankingList.slice(0, 3)} />
      <RankTable ranks={rankingList} />
    </div>
  );
};

const TopRankList = ({ topRanks }: { topRanks: RankItem[] }) => {
  const hasSecond = topRanks.at(1) !== undefined;
  const hasThird = topRanks.at(2) !== undefined; // Second가 없으면 Third도 없긴 해

  return (
    <div className="flex flex-row">
      {hasSecond && <TopRankItem rank={TopRank.SECOND} {...topRanks[1]} />}
      <TopRankItem rank={TopRank.FIRST} {...topRanks[0]} />
      {hasThird && <TopRankItem rank={TopRank.THIRD} {...topRanks[2]} />}
    </div>
  );
};

const RankTable = ({ ranks }: { ranks: RankItem[] }) => {
  return (
    <table className="w-full table-fixed border-spacing-0">
      <thead>
        <tr className="text-green-700 [&>th]:py-2">
          <th>순위</th>
          <th>이름</th>
          <th>집중시간</th>
          <th>집중</th>
        </tr>
      </thead>

      <tbody>
        {ranks.map((rank, index) => (
          <RankTableItem key={rank.id} isMe={rank.id === 4} rank={index} {...rank} />
        ))}
      </tbody>
    </table>
  );
};

type RankTableItemProps = {
  rank: number;
  isMe: boolean;
} & RankItem;

const RankTableItem = ({ rank, isMe, focusTime, id, isFocusing, name }: RankTableItemProps) => {
  const durationLabel = getDurationLabel(focusTime);

  return (
    <tr
      className={cn(
        `odd:bg-gray-100 [&>td]:py-2 [&>td]:text-center [&>td:first-child]:rounded-l-md [&>td:last-child]:rounded-r-md relative`,
        {
          ['bg-green-50 border border-green-400 [&>td]:font-semibold [&>td]:text-green-900']: isMe,
        }
      )}>
      <td>{`${rank + 1}위`}</td>
      <td>{name}</td>
      <td>{durationLabel}</td>
      <td>{isFocusing ? '🔥' : '❌'}</td>
    </tr>
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
