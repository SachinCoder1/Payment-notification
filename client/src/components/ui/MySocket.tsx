"use client";

import { useTransactionStore } from "@/store/store";
import React from "react";
import { useEffect } from "react";
import { io } from "socket.io-client";

const BACKEND_API_BASE_URL: string =
  process.env.NEXT_PUBLIC_BACKEND_API_BASE_URL || "";

export default function MySocket() {
  const transaction = useTransactionStore((state) => state.transaction);
  const setTransaction = useTransactionStore((state) => state.setTransaction);

  let socket: any;
  const initiateSocket = () => {
    try {
      const accessTokenString = localStorage.getItem("accessToken");
      console.log("accessTokenString", accessTokenString);

      if (accessTokenString) {
        socket = io(BACKEND_API_BASE_URL, {
          query: {
            accessToken: accessTokenString,
          },
        });

        socket.on("connect", () => {
          console.log("Connected to the server");
        });

        socket.on("without-socket-id", (data: any) => {
          console.log("data", data);

          if (data) {
            setTransaction(data?.myBody?.event?.activity[0] || {});
          }
        });
      }
    } catch (error) {
      console.log("error: ", error);
    }
  };

  return <button onClick={() => initiateSocket()}>connect to socket</button>;
}
