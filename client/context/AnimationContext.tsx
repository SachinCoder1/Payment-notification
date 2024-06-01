import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  ReactNode,
  FC,
} from "react";

interface AnimationContextType {
  playAnimation: boolean;
  toggleAnimation: (play: boolean) => void;
}

const AnimationContext = createContext<AnimationContextType | null>(null);

export const useAnimation = () => {
  const context = useContext(AnimationContext);
  if (!context) {
    throw new Error("useAnimation must be used within an AnimationProvider");
  }
  return context;
};

interface AnimationProviderProps {
  children: ReactNode;
}

export const AnimationProvider: FC<AnimationProviderProps> = ({ children }) => {
  const [playAnimation, setPlayAnimation] = useState<boolean>(false);
  const toggleAnimation = useCallback((play: boolean) => {
    setPlayAnimation(play);
  }, []);

  return (
    <AnimationContext.Provider value={{ playAnimation, toggleAnimation }}>
      {children}
    </AnimationContext.Provider>
  );
};
