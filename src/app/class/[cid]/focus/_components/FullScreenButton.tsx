'use client';

import { Expand } from 'lucide-react';

/** Note: Safari에서는 FullScreen API 이슈가 좀 있어서 손을 좀 봐야 하는데 일단 기능만! */
export const FullScreenButton = () => {
  return (
    <button
      onClick={() => {
        document.querySelector('#focusSection')!.requestFullscreen();
      }}>
      <Expand />
    </button>
  );
};
