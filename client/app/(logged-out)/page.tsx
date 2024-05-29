import PaymentQr from "@/components/qr/PaymentQr";
import { Button } from "@/components/ui/button";
import React from "react";

export default function LandingPage() {
  return (
    <div>
      Hey 🙋🏻‍♂️👋🏻 Welcome to our Payment notifications app
      <PaymentQr />
    </div>
  );
}
