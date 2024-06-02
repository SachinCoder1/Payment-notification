// Setup: npm install alchemy-sdk
import { Alchemy, AssetTransfersCategory, Network } from "alchemy-sdk";
import {
  ALCHEMY_API_KEY_001,
  ALCHEMY_WEBHOOK_ID,
  X_ALCHEMY_TOKEN,
} from "~/constants";
const config = {
  apiKey: ALCHEMY_API_KEY_001,
  network: Network.ETH_SEPOLIA,
};
const alchemy = new Alchemy(config);
const toAddress = "0xE9211a464235cDFbec618d18b716Ae2fF47Ddc43";
export const getUserReceiveTransaction = async (address: any) => {
  try {
    const res = await alchemy.core.getAssetTransfers({
      toAddress: address,
      excludeZeroValue: true,
      category: ["external", "internal"] as AssetTransfersCategory[],
    });

    return res;
  } catch (error) {
    console.log("error", error);
  }
};
export const getUserSentTransaction = async (address: any) => {
  try {
    const res = await alchemy.core.getAssetTransfers({
      fromAddress: address,
      excludeZeroValue: true,
      category: ["external", "internal"] as AssetTransfersCategory[],
    });

    return res;
  } catch (error) {
    console.log("error", error);
  }
};
