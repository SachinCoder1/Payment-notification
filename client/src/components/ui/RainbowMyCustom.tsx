"use client";

import React, { useState } from "react";
import { useEffect } from "react";
import { useAccount } from "wagmi";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { authenticateMerchant, onboardMerchant } from "@/app/api";
import { signMessage } from "@wagmi/core";
import { config } from "@/app/config/config";
import { Button } from "@/components/ui/button";

export default function RainbowMyCustom() {
  const { address, isConnected, isReconnecting, chain } = useAccount();

  const [isOnboarded, setIsOnboarded] = useState(false);

  useEffect(() => {
    const callAuthentication = async () => {
      const accessTokenString = localStorage.getItem("accessToken");
      if (accessTokenString) {
        return;
      } else {
        await authenticateMerchant(address, chain);
      }
    };

    if (isConnected && address && chain) {
      callAuthentication();
    }
  }, [isConnected, address, isReconnecting, chain]);

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
        height: "100vh", // This makes the div take up the full viewport height
        boxShadow: "0px 3px 6px #00000029", // example shadow
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
    </div>
  );
}
