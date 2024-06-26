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

    const lowerCaseAddress = address.toLowerCase();

    const isMerchantExist: any = await Merchant.findOne({
      address: lowerCaseAddress,
    });

    if (isMerchantExist) {
      res.status(200).send({
        Status: "OK",
        accessToken: isMerchantExist.accessToken,
        message: "Existing Merchant",
        isOnboarded: isMerchantExist.isOnboarded,
      });

      return isMerchantExist;
    }

    const accessToken = generateAccessToken(lowerCaseAddress);

    console.log("accessToken", accessToken);

    await Merchant.create({
      address: lowerCaseAddress,
      chain,
      accessToken,
    });

    console.log("Merchant created");

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

    const newWebhook = new Webhook({ completeData: req.body });
    await newWebhook.save();

    console.log("socket emitting...");

    const { toAddress } = req.body.event.activity[0];

    console.log("toAddress", toAddress);

    const lowerCaseToAddress = toAddress.toLowerCase();

    const existingMerchant = await Merchant.findOne({
      address: lowerCaseToAddress,
    });

    console.log("existingMerchant", existingMerchant);

    if (!existingMerchant) {
      console.log("merchant not found");

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
    console.log("error", error);

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
    const lowerCaseAddress = address.toLowerCase();
    if (address) {
      console.log("address", address);
    } else {
      return res.status(400).json({ message: "Address is required" });
    }

    const received: any = await getUserReceiveTransaction(lowerCaseAddress);
    const sent: any = await getUserSentTransaction(lowerCaseAddress);
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

    const lowerCaseAddress = address.toLowerCase();
    let merchant = await Merchant.findOne({
      address: lowerCaseAddress,
    });

    if (!merchant) {
      return res.status(200).json({
        status: "error",
        message: "Address not found",
      });
    }

    const isOnboarded: boolean = await addWalletAddressToAlchemy(
      lowerCaseAddress
    );

    if (isOnboarded) {
      await Merchant.findOneAndUpdate(
        { address: lowerCaseAddress },
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

    const lowerCaseAddress = address.toLowerCase();

    const res = await axios.patch(
      "https://dashboard.alchemy.com/api/update-webhook-addresses",
      {
        addresses_to_add: [lowerCaseAddress],
        addresses_to_remove: [],
        webhook_id: ALCHEMY_WEBHOOK_ID,
      },
      {
        headers: {
          "X-Alchemy-Token": X_ALCHEMY_TOKEN,
        },
      }
    );
    console.log("res", res);

    const { data } = res;

    if (Object.keys(data).length === 0) {
      console.log("Wallet Address Added to Alchemy");
      return true;
    }

    return false;
  } catch (error) {
    console.log("error while addWalletAddressToAlchemy", error);

    return false;
  }
};
