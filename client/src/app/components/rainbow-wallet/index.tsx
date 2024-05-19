"use client";

import React from "react";
import { useEffect } from "react";
import { useAccount } from "wagmi";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import axios from "axios";
export default function RainbowMyCustom() {
  const {
    address,
    isConnected,
    isConnecting,
    isReconnecting,
    status,
    chainId,
    chain,
  } = useAccount();

  useEffect(() => {
    if (isReconnecting) {
      return;
    }
    if (isConnected && address) {
      // authenticateUser(address);
    }
  }, [isConnected, address, isReconnecting]);

  async function authenticateUser(walletAddress: any) {
    try {
      console.log("authenticateUser", authenticateUser);
    } catch (error) {
      console.error("Failed to authenticate:", error);
    }
  }
  return (
    <div>
      <ConnectButton />
    </div>
  );
}
