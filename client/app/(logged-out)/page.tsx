"use client";
import PaymentQr from "@/components/qr/PaymentQr";
import Transactions from "@/components/transaction/page";
import Navbar from "@/components/ui/Navbar";

import React from "react";
import { useAccount } from "wagmi";

export default function LandingPage() {
  const { address } = useAccount();

  return (
    <div>
      <div className="flex flex-col items-center justify-center  ">
        <span>
          <h1>Hey Welcome 👋🏻 </h1>
        </span>
        <span>
          <h2>To Your Crypto Soundbox </h2>
        </span>
      </div>
      <Navbar />
      {address && (
        <div className="grid grid-cols-2 gap-4 mt-4">
          <div className="flex items-center justify-center p-24 border-dotted border-2 border-sky-500 ">
            <Transactions />
          </div>
          <div className="border-dotted border-2 border-sky-500 p-24">
            <PaymentQr />
          </div>
        </div>
      )}
    </div>
  );
}
