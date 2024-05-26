"use client";

import React, { useState, useEffect } from "react";
import { useAccount, useDisconnect } from "wagmi";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { authenticateMerchant, onboardMerchant } from "@/app/api";
import { signMessage } from "@wagmi/core";
import { config } from "@/app/config/config";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import MySocket from "./Mysocket";

export default function RainbowMyCustom() {
  const { address, isConnected, isReconnecting, chain, isDisconnected } =
    useAccount();
  const { disconnect } = useDisconnect();
  const [isOnboarded, setIsOnboarded] = useState(false);
  const { toast } = useToast();
  useEffect(() => {
    const callAuthentication = async () => {
      const accessTokenString = localStorage.getItem("accessToken");
      if (!accessTokenString) {
        const res = await authenticateMerchant(address, chain);
        if (res.status === "success") {
          toast({
            title: "Authentication",
            description: "Authentication successful",
          });
        }
      }
    };

    if (isConnected && address && chain) {
      callAuthentication();
    }
  }, [isConnected, address, isReconnecting, chain]);

  useEffect(() => {
    if (isDisconnected) {
      localStorage.removeItem("accessToken");
    }
  }, [isDisconnected]);

  const makeUserSign = async () => {
    if (address) {
      const userSigning = await signMessage(config, {
        account: address,
        message: "Add Your Wallet to our tracker",
      });

      console.log("userSigning", userSigning);

      if (userSigning) {
        const response = await onboardMerchant(address);
        console.log("response", response);

        if (response?.isOnboarded) {
          setIsOnboarded(true);
        }
      }
    }
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        boxShadow: "0px 3px 6px #00000029",
        padding: "20px",
        borderRadius: "10px",
        gap: "1rem",
      }}
    >
      <ConnectButton />

      {address && !isOnboarded && (
        <Button
          onClick={() => {
            makeUserSign();
          }}
          className="normal-case flex justify-between pr-1"
        >
          Sign the message
        </Button>
      )}

      {address && <MySocket />}
    </div>
  );
}
