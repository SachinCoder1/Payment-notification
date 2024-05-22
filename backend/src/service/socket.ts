import { Server as HttpServer } from "http";
import { Server } from "socket.io";

export const io = new Server();
export const initializeSocket = (httpServer: HttpServer) => {
  io.attach(httpServer, {
    cors: {
      origin: "*",
    },
    pingInterval: 10000,
    pingTimeout: 5000,
  });
  io.on("connection", async (socket: any) => {
    console.log("New user connected");
    socket.on("disconnect", async () => {
      console.log("disconnecting");
    });
  });
};
