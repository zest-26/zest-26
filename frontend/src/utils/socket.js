import { io } from "socket.io-client";

export const socket = io("https://zest-26.onrender.com", {
  transports: ["websocket"],
});
