import { Request, Response } from "express";
import Merchant from "~/model/merchant";
import Webhook from "~/model/webhook";
import axios from "axios";
import { ALCHEMY_WEBHOOK_ID, X_ALCHEMY_TOKEN } from "~/constants";

export const signupWithEmail = async (req: Request, res: Response) => {
  try {
    const { email, password, name } = req.body;
    return res.status(201).json({
      user: { email, password, name },
    });
  } catch (error) {
    return res.status(500).json({ message: "INTERNAL_ERROR" });
  }
};

export const alchemyWebhooks = async (req: Request, res: Response) => {
  try {
    const newWebhook = new Webhook({ completeData: req.body });

    await newWebhook.save();

    return res.status(201).json({
      status: "success",
      message: "connected",
    });
  } catch (error) {
    return res.status(500).json({ message: "INTERNAL_ERROR" });
  }
};
export const test = async (req: Request, res: Response) => {
  try {
    console.log("api hit");

    return res.status(201).json({
      status: "success",
      message: "connected",
    });
  } catch (error) {
    return res.status(500).json({ message: "INTERNAL_ERROR" });
  }
};

export const merchantOnboard = async (req: Request, res: Response) => {
  try {
    const { address, chain } = req.body;

    let merchant = await Merchant.findOne({
      address: address,
    });

    if (!merchant) {
      merchant = new Merchant({ address, chain });
      await merchant.save();
    }

   await addWalletAddressToAlchemy(address);

    return res.status(200).json({
      status: "success",
      message: "Merchant onboarded successfully",
      data: merchant,
    });
  } catch (error) {
    return res.status(500).json({ message: "INTERNAL_ERROR" });
  }
};

export const addWalletAddressToAlchemy = async (address: string) => {
  try {
    const { data } = await axios.patch(
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
    console.log("data:", data);
    return true;
  } catch (error) {
    return false;
  }
};
