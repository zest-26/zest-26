import { io } from "socket.io-client";

export const socket = io("YOUR_RENDER_BACKEND_URL", {
  transports: ["websocket"],
});
