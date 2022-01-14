import { io } from 'socket.io-client';
import { appBaseUrl } from '../config';

export const socket = io(`ws://${appBaseUrl}`, {
  autoConnect: false,
});

export type SocketType = ReturnType<typeof io>;
