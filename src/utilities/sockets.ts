import { io } from 'socket.io-client';
import { baseAppName } from '../config';

export const socket = io(`ws://${baseAppName}`, {
  autoConnect: false,
});

export type SocketType = ReturnType<typeof io>;
