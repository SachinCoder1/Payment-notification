"use client";

import React from "react";
import QRCode from "react-qr-code";
import { useAccount } from "wagmi";

export default function PaymentQr() {
  const { address } = useAccount();
  if (!address) return <div></div>;
  return (
    <div className="mt-10 space-y-6">
      <h2 className="text-2xl">Please scan QR or type the address</h2>
      <div className="flex justify-center">
        <QRCode className="p-2 bg-white rounded-xl border-2" value={address} />
      </div>
    </div>
  );
}
