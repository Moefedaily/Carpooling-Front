import { io, Socket } from "socket.io-client";

let socket: Socket | null = null;

export const initializeSocket = (token: string): Socket => {
  if (!socket) {
    socket = io(process.env.NEXT_PUBLIC_WEBSOCKET_URL, {
      withCredentials: true,
      auth: {
        token: `Bearer ${token}`,
      },
    });

    socket.on("connect", () => {
      console.log("Connected to WebSocket server");
    });

    socket.on("disconnect", () => {
      console.log("Disconnected from WebSocket server");
    });

    socket.on("error", (error) => {
      console.error("WebSocket error:", error);
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
