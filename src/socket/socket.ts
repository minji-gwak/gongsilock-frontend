'use client';

import { io } from 'socket.io-client';

// TODO: env로 넣기
const SOCKET_LOCAL_SERVER_URL = 'http://localhost:4000';
const SOCKET_PROD_SERVER_URL = 'http://localhost:4000';

const socketURL = process.env.NODE_ENV === 'production' ? SOCKET_PROD_SERVER_URL : SOCKET_LOCAL_SERVER_URL;

export const socket = io(socketURL, { withCredentials: true });
