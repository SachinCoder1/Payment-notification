'use client'

// src/TTSComponent.tsx
import React, { useState, useEffect } from "react";

// Define types for voice and message
interface Voice {
  name: string;
  lang: string;
  [key: string]: any; // To accommodate any other properties that might exist
}

const TTSComponent: React.FC = () => {
  const [voices, setVoices] = useState<Voice[]>([]);
  const [selectedVoice, setSelectedVoice] = useState<string | null>(null);

  useEffect(() => {
    const fetchVoices = () => {
      const availableVoices = window.speechSynthesis.getVoices() as Voice[];
      setVoices(availableVoices);
      if (availableVoices.length > 0) {
        setSelectedVoice(availableVoices[0].name);
      }
    };

    fetchVoices();
    window.speechSynthesis.onvoiceschanged = fetchVoices;
  }, []);

  const handleSpeak = () => {
    const message:any = new SpeechSynthesisUtterance();
    message.text = "Hello, how is it going?";
    if (selectedVoice) {
      message.voice = voices.find((voice) => voice.name === selectedVoice) || null;
    }
    window.speechSynthesis.speak(message);
  };

  return (
    <div>
      <div>
        <label htmlFor="voices">Choose a voice: </label>
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
        </select>
      </div>
      <button onClick={handleSpeak}>Speak</button>
    </div>
  );
};

export default TTSComponent;
