"use client";

import React, { useState, useEffect } from "react";
import { useAccount, useDisconnect } from "wagmi";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { signMessage } from "@wagmi/core";
import { authenticateMerchant, onboardMerchant, testSocket } from "@/app/api";
import { config } from "@/app/config/config";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { initiateSocket } from "@/services/socket";

export default function ConnectWallet() {
  const { address, isConnected, isReconnecting, chain, isDisconnected } =
    useAccount();
  const [isOnboarded, setIsOnboarded] = useState(false);
  const { toast } = useToast();
  useEffect(() => {
    const callAuthentication = async () => {
      const accessTokenString = localStorage.getItem("accessToken");
      if (!accessTokenString) {
        const res: any = await authenticateMerchant(address, chain);
        if (res.status === "success") {
          toast({
            title: "Authentication",
            description: "Authentication successful",
          });
          if (res?.data?.isOnboarded) {
            setIsOnboarded(true);
            setTimeout(() => {
              toast({
                title: "Onboarding Status",
                description: "You are all set to receive notifications",
              });
            }, 5000);
          }

          initiateSocket();
        }
      }
    };

    if (isConnected && address && chain) {
      callAuthentication();
    }
  }, [isConnected, address, isReconnecting, chain]);

  useEffect(() => {
    if (isDisconnected) {
      toast({
        title: "Connection Status",
        description: "You are disconnected",
      });
      localStorage.removeItem("accessToken");
    }
  }, [isDisconnected]);

  const makeUserSign = async () => {
    if (address) {
      const userSigning = await signMessage(config, {
        account: address,
        message: "Add Your Wallet to our tracker",
      });

      if (userSigning) {
        const response = await onboardMerchant(address);

        if (response?.isOnboarded) {
          toast({
            title: "Onboarding Status",
            description: "You are all set to receive notifications",
          });
          setIsOnboarded(true);
        }
      }
    }
  };

  return (
    <div className="flex gap-2 items-center justify-center p-24">
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
