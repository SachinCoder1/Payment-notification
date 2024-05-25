"use client";

import { useEffect } from "react";
import { io } from "socket.io-client";
import RainbowMyCustom from "../components/ui/RainbowMyCustom";
import { useToast } from "@/components/ui/use-toast";
export default function Home() {
  const { toast } = useToast();
  const initiateSocket = () => {
    const accessTokenString = localStorage.getItem("accessToken");
    if (accessTokenString) {
      const socket = io("http://localhost:8000", {
        query: {
          accessToken: accessTokenString,
        },
      });

      socket.on("connect", () => {
        console.log("Connected to the server");
        toast({
          title: "Connected to the server",
          description: "socket connected successfully",
        });
      });

      socket.on("general-feed-emitter", (data) => {
        console.log("data", data);
      });
      socket.on("without-socket-id", (data) => {
        console.log("data", data);
      });
    }
  };

  initiateSocket();
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <RainbowMyCustom />
    </main>
  );
}
