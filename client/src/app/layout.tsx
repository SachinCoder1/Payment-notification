"use client";

import { Inter } from "next/font/google";
// import "./globals.css";
import "@rainbow-me/rainbowkit/styles.css";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { WagmiProvider } from "wagmi";
import {
  arbitrum,
  base,
  mainnet,
  optimism,
  polygon,
  sepolia,
} from "wagmi/chains";
import { getDefaultConfig, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { Toaster } from "@/components/ui/toaster";
import ConnectWallet from "@/components/auth/ConnectWallet";
import Navbar from "@/components/navbar";
const config = getDefaultConfig({
  appName: "RainbowKit App",
  projectId: "YOUR_PROJECT_ID",
  chains: [mainnet, polygon, optimism, arbitrum, base, sepolia],
  ssr: true,
});

const client = new QueryClient();

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <WagmiProvider config={config}>
          <QueryClientProvider client={client}>
            <RainbowKitProvider>
              <div
                style={{
                  // display: "flex",
                  // flexDirection: "column",
                  // justifyContent: "center",
                  // alignItems: "center",
                  height: "91vh", // This makes the div take up the full viewport height
                  boxShadow: "0px 3px 6px #00000029", // example shadow
                  padding: "20px",
                  borderRadius: "10px",
                  gap: "1rem",
                  margin: "10px",
                }}
              >
                <Navbar />
                <div style={{marginTop: "20px"}}>{children}</div>
              </div>
            </RainbowKitProvider>
          </QueryClientProvider>
        </WagmiProvider>
        <Toaster />
      </body>
    </html>
  );
}
