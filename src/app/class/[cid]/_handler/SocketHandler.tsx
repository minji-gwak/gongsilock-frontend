'use client';

import { socket } from '@/socket/socket';
import { useEffect } from 'react';

export const SocketHandler = () => {
  useEffect(() => {
    const handleConnect = () => {};
    const handleDisconnect = () => {};

    socket.on('connect', handleConnect);
    socket.on('disconnect', handleDisconnect);

    return () => {
      socket.off('connect', handleConnect);
      socket.off('disconnect', handleDisconnect);
    };
  }, []);

  return <></>;
};
