'use client'

import React from "react";
import { useEffect } from "react";
import { io } from "socket.io-client";

export default function MySocket() {
  const initiateSocket = () => {
    try {
      const accessTokenString = localStorage.getItem("accessToken");
      console.log("accessTokenString", accessTokenString);

      if (accessTokenString) {
        const socket = io("http://localhost:8000", {
          query: {
            accessToken: accessTokenString,
          },
        });
        console.log("socket:", socket);

        socket.on("connect", () => {
          console.log("Connected to the server");
          //   toast({
          //     title: "Connected to the server",
          //     description: "socket connected successfully",
          //   });
        });

        console.log("passed socket.on connect");

        socket.on("general-feed-emitter", (data) => {
          console.log("data", data);
        });
        socket.on("without-socket-id", (data) => {
          console.log("data", data);
        });
      }
    } catch (error) {
      console.log("error: ", error);
    }
  };

  return <button onClick={() => initiateSocket()}>connect to socket</button>;
}
