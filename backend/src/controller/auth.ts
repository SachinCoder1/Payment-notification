import { Request, Response } from "express";
import Merchant from "~/model/merchant";
import Webhook from "~/model/webhook";

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

    return res.status(200).json({
      status: "success",
      message: "Merchant onboarded successfully",
      data: merchant,
    });
  } catch (error) {
    return res.status(500).json({ message: "INTERNAL_ERROR" });
  }
};
