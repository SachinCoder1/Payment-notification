import { useEffect } from "react";
import { io } from "socket.io-client";
import RainbowMyCustom from "../components/ui/RainbowMyCustom";
import { useToast } from "@/components/ui/use-toast";
import { useAccount } from "wagmi";
import MySocket from "@/components/ui/MySocket";
export default function Home() {
  // const address = useAccount();

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <RainbowMyCustom />

    </main>
  );
}
