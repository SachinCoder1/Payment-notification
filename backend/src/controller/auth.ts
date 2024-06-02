import { Request, Response } from "express";
import {
  generateAccessToken,
  generateRefreshToken,
} from "~/middleware/authentication";
import Merchant from "~/model/merchant";
import Webhook from "~/model/webhook";
import axios from "axios";
import { ALCHEMY_WEBHOOK_ID, X_ALCHEMY_TOKEN } from "~/constants";
import { getUserReceiveTransaction, getUserSentTransaction } from "~/service";

export const authenticateUser = async (req: Request, res: Response) => {
  try {
    const { address, chain } = req.body;

    const isMerchantExist: any = await Merchant.findOne({
      address: address,
    });

    if (isMerchantExist) {
      console.log("Merchant Exist");

      res.status(200).send({
        Status: "OK",
        accessToken: isMerchantExist.accessToken,
        message: "Existing Merchant",
        isOnboarded: isMerchantExist.isOnboarded,
      });

      return isMerchantExist;
    }

    const accessToken = generateAccessToken(address);

    await Merchant.create({
      address,
      chain,
      accessToken,
    });
    res.status(200).send({
      Status: "OK",
      accessToken,
      message: "Merchant created",
    });
  } catch (error) {
    console.log("error", error);

    return res.status(500).json({ message: "INTERNAL_ERROR" });
  }
};

export const verifyAccesstoken = async (accessToken: any) => {
  try {
    const isValid: any = await Merchant.findOne({ accessToken: accessToken });

    if (isValid) {
      return isValid;
    } else {
      return false;
    }
  } catch (error) {
    console.log("while validating access token");
  }
};

// 1. Socket connection
// 2. find the "to" wallet address in our merchant records
// 3. if it is there then emit the socket event to frontend that received this payment

// io.emit("without-socket-id", {
//   noSocket: true,
//   myBody: req.body,
// });

export const alchemyWebhooks = async (req: any, res: Response) => {
  try {
    console.log("webhook hit");

    console.log("req.body", req.body);

    const io = req.socketio;

    console.log("io", io);

    const newWebhook = new Webhook({ completeData: req.body });
    await newWebhook.save();

    console.log("socket emitting...");

    const { toAddress } = req.body.event.activity[0];

    console.log("toAddress", toAddress);

    const existingMerchant = await Merchant.findOne({ address: toAddress });

    console.log("existingMerchant", existingMerchant);

    if (!existingMerchant) {
      return res.status(200).json({
        status: "error",
        message: "Merchant not found",
      });
    }

    const socketId = existingMerchant.socketId;

    console.log("socketId", socketId);

    if (!socketId) {
      console.log("socket not found");

      return res.status(200).json({
        status: "error",
        message: "user is not connected to socket",
      });
    }

    io.to(socketId).emit("user-specific-notification", {
      myBody: req.body,
    });

    console.log("socket emitted...");
    return res.status(201).json({
      status: "success",
      message: "connected",
    });
  } catch (error) {
    return res.status(500).json({ message: "INTERNAL_ERROR" });
  }
};
export const test = async (req: any, res: any) => {
  try {
    const io = req.socketio;
    // const existingMerchant = await Merchant.findById({
    //   _id: "6652e437596cbc70a27aa084",
    // });
    // const socketId = existingMerchant?.socketId;
    // if (socketId && io) {
    //   console.log("feed emitted on backend");
    //   io.to(socketId).emit("general-feed-emitter", {
    //     newTransaction: "tx-hash",
    //   });
    // }

    io.emit("without-socket-id", {
      isSocketConnected: true,
      message: "socket connected test api hit",
    });
    // io.to(socketId).emit('general-feed-emitter', newFeed);
    return res.status(201).json({
      status: "success",
      message: "socket emitted to all connected users",
    });
  } catch (error) {
    return res.status(500).json({ message: "INTERNAL_ERROR" });
  }
};
export const getUserTransactionController = async (req: any, res: any) => {
  try {
    const address = req.body.address;

    if (address) {
      console.log("address", address);
    } else {
      return res.status(400).json({ message: "Address is required" });
    }

    const received: any = await getUserReceiveTransaction(address);
    const sent: any = await getUserSentTransaction(address);
    return res.status(201).json({
      status: "success",
      data: { received, sent },
    });
  } catch (error) {
    console.log("error", error);

    return res
      .status(500)
      .json({ message: "getUserReceiveTransactionController error" });
  }
};

export const merchantOnboard = async (req: Request, res: Response) => {
  try {
    const { address } = req.body;

    let merchant = await Merchant.findOne({
      address: address,
    });

    if (!merchant) {
      return res.status(200).json({
        status: "error",
        message: "Address not found",
      });
    }

    const isOnboarded: boolean = await addWalletAddressToAlchemy(address);

    if (isOnboarded) {
      await Merchant.findOneAndUpdate(
        { address },
        {
          isOnboarded: true,
        }
      );

      console.log("Merchant Onboard Status Updated");
    }

    return res.status(200).json({
      status: "success",
      message: isOnboarded
        ? "Merchant onboarded successfully"
        : "Check something got wrong",
      data: merchant,
      isOnboarded: isOnboarded,
    });
  } catch (error) {
    return res.status(500).json({ message: "INTERNAL_ERROR" });
  }
};

export const addWalletAddressToAlchemy = async (address: string) => {
  try {
    console.log("address", address);

    const res = await axios.patch(
      "https://dashboard.alchemy.com/api/update-webhook-addresses",
      {
        addresses_to_add: [address],
        addresses_to_remove: [],
        webhook_id: ALCHEMY_WEBHOOK_ID,
      },
      {
        headers: {
          "X-Alchemy-Token": X_ALCHEMY_TOKEN,
        },
      }
    );

    const { data } = res;

    if (Object.keys(data).length === 0) {
      return true;
    }

    return false;
  } catch (error) {
    return false;
  }
};
