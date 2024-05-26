import { Server as HttpServer } from "http";
import { Server } from "socket.io";
import { verifyAccesstoken } from "~/controller/auth";
import Merchant from "~/model/merchant";

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
    const { accessToken } = socket.handshake.query;

    let merchantId: any;
    if (accessToken) {
      const verifiedMerchant: any = await verifyAccesstoken(accessToken);

      if (verifiedMerchant) {
        merchantId = verifiedMerchant._id;
        const socketId = socket.id;
        if (merchantId) {
          updateMerchantSocketId(merchantId, socket.id);
        }
      }
    }

    socket.on("disconnect", async () => {
      console.log("disconnecting");
      clearUserSocketId(merchantId);
    });
  });
};

export const updateMerchantSocketId = async (
  merchantId: any,
  socketId: any
) => {
  try {
    const result = await Merchant.findByIdAndUpdate(
      merchantId,
      { socketId },
      { new: true } // Returns the updated document
    );

    if (!result) {
      console.error(`No merchant found with id ${merchantId}`);
    } else {
      console.log(`Updated socket ID for merchantId ${merchantId}`);
    }
  } catch (err) {
    console.error("Error updating merchant socket ID:", err);
  }
};

export const clearUserSocketId = async (merchantId: any) => {
  try {
    const result = await Merchant.findByIdAndUpdate(
      merchantId,
      { socketId: null },
      { new: true } // Returns the updated document
    );

    if (!result) {
      console.error(`No user found with id ${merchantId}`);
    } else {
      console.log(`Cleared socket ID for user ${merchantId}`);
    }
  } catch (err) {
    console.error("Error clearing user socket ID:", err);
  }
};
