"use client";

import { useEffect } from "react";
import { io } from "socket.io-client";
import RainbowMyCustom from "../components/ui/RainbowMyCustom";

export default function Home() {
  const initiateSocket = () => {
    const socket = io("http://localhost:8000", {
      pingInterval: 10000,
      pingTimeout: 5000,
    });

    socket.on("connect", () => {
      console.log("Connected to the server");
    });
  };

  initiateSocket();
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <RainbowMyCustom />
    </main>
  );
}
