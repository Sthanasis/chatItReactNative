import { io } from 'socket.io-client';

export const socket = io('ws://192.168.1.72:3000', {
  autoConnect: false,
});

export type SocketType = ReturnType<typeof io>;
