import { io, Socket } from "socket.io-client";

let socket: Socket | null = null;

let reconnectAttempts = 0;
const maxReconnectAttempts = 5;

export const initializeSocket = (token: string): Socket => {
  if (!socket) {
    socket = io("http://localhost:3333", {
      auth: { token: `Bearer ${token}` },
      reconnection: true,
      reconnectionAttempts: maxReconnectAttempts,
      reconnectionDelay: 1000,
    });

    socket.on("connect", () => {
      console.log("Connected to WebSocket server");
      reconnectAttempts = 0;
    });

    socket.on("disconnect", () => {
      console.log("Disconnected from WebSocket server");
    });

    socket.on("reconnect_failed", () => {
      console.error(
        "WebSocket reconnection failed after",
        maxReconnectAttempts,
        "attempts"
      );
    });
  }

  return socket;
};
export const getSocket = (): Socket | null => socket;
console.log(getSocket());

export const disconnectSocket = (): void => {
  if (socket) {
    socket.disconnect();
    socket = null;
  }
};
