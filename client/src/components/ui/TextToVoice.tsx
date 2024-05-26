"use client";

import { useTransactionStore } from "@/store/store";
import React, { useState, useEffect } from "react";

// Define types for voice and message
interface Voice {
  name: string;
  lang: string;
  [key: string]: any; // To accommodate any other properties that might exist
}

const TextToVoice = ({
  text = "",
  // onClick,
}: {
  text: string;
  // onClick: any;
}) => {
  const transaction: any = useTransactionStore((state) => state.transaction);
  const [voices, setVoices] = useState<Voice[]>([]);
  const [selectedVoice, setSelectedVoice] = useState<string | null>(null);

  useEffect(() => {
    const fetchVoices = () => {
      const availableVoices = window.speechSynthesis.getVoices() as Voice[];
      setVoices(availableVoices);
      if (availableVoices.length > 0) {
        setSelectedVoice("Google UK English Female" || availableVoices[0].name);
      }
    };

    fetchVoices();
    window.speechSynthesis.onvoiceschanged = fetchVoices;
  }, []);

  const handleSpeak = () => {
    const audio = new Audio("/sounds/positive_sound.wav");
    audio
      .play()
      .then(() => {
        setTimeout(() => {
          console.log("selectedVoice:", selectedVoice);
          console.log(
            "voices:",
            voices.find((voice) => voice.name === selectedVoice)
          );
          const message: any = new SpeechSynthesisUtterance();
          const shortAddress = `${transaction.fromAddress.slice(
            0,
            6
          )}...${transaction.fromAddress.slice(-4)}`;
          message.text = `Received ${transaction.value} ${transaction.asset} from ${shortAddress}`;
          if (selectedVoice) {
            message.voice =
              voices.find((voice) => voice.name === selectedVoice) || null;
          }
          window.speechSynthesis.speak(message);
        }, 1000);
      })
      .catch((err) => {
        console.log("err: ", err);
      });
  };

  return (
    <div>
      <div>
        {/* <label htmlFor="voices">Choose a voice: </label>
        <select
          id="voices"
          onChange={(e) => setSelectedVoice(e.target.value)}
          value={selectedVoice || ""}
        >
          {voices.map((voice) => (
            <option key={voice.name} value={voice.name}>
              {voice.name} ({voice.lang})
            </option>
          ))}
        </select> */}
      </div>
      {/* <button onClick={onClick}>Speak</button> */}
    </div>
  );
};

export default TextToVoice;
