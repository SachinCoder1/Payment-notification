import React, { useEffect, useRef } from "react";
import Lottie from "react-lottie";
import animationData from "./money.json";
import { useAnimation } from "@/context/AnimationContext";
const defaultOptions = {
  loop: false,
  autoplay: false, // Control playback programmatically
  animationData: animationData,
  rendererSettings: {
    preserveAspectRatio: "xMidYMid slice",
  },
};

interface LottieControlProps {
  // Correctly typed as boolean
}

const LottieControl: React.FC<LottieControlProps> = () => {
  const { playAnimation } = useAnimation();
  const animationInstance = useRef<any>(null);

  //   useEffect(() => {
  //     if (play && animationInstance.current) {
  //       animationInstance.current.play();
  //     }
  //   }, [play]);

  return (
    <div className={`absolute inset-0 z-0 ${playAnimation ? "" : "hidden"}`}>
      <Lottie
        options={defaultOptions}
        isStopped={!playAnimation}
        height={"100%"}
        width={"100%"}
        ref={animationInstance}
      />
    </div>
  );
};

export default LottieControl;
