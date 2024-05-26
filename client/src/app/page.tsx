import RainbowMyCustom from "../components/ui/RainbowMyCustom";
import TextToVoice from "@/components/ui/TextToVoice";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh", // This makes the div take up the full viewport height
          boxShadow: "0px 3px 6px #00000029", // example shadow
          padding: "20px",
          borderRadius: "10px",
          gap: "1rem",
        }}
      >
        <RainbowMyCustom />
        
        <TextToVoice
          text="Received 20 USDC from Vitalik"
          // onClick={() => {
          //   console.log("text");
          // }}
        />
      </div>
    </main>
  );
}
