interface Voice {
  name: string;
  lang: string;
  [key: string]: any; // To accommodate any other properties that might exist
}

export const handleSpeak = (text: string) => {

  const availableVoices = window.speechSynthesis.getVoices() as Voice[];
  const selectedVoice = "Google UK English Female" || availableVoices[0].name;

  const audio = new Audio("/sounds/positive_sound.wav");
  audio
    .play()
    .then(() => {
      setTimeout(() => {
        const message: any = new SpeechSynthesisUtterance();
        console.log("speaing...")
        message.text = text;
        if (selectedVoice) {
          message.voice =
            availableVoices.find((voice) => voice.name === selectedVoice) ||
            null;
        }
        window.speechSynthesis.speak(message);
      }, 1000);
    })
    .catch((err) => {
      console.log("err: ", err);
    });
};
