"use client";

import { useState } from "react";

import { Moon, Sun } from "lucide-react";
import {
  Tooltip,
  TooltipProvider,
  TooltipTrigger,
  TooltipContent,
} from "./tooltip";

type Props = {
  className?: string;
};

export function LightDarkToggle({ className }: Props) {
  const [isDarkMode, setIsDarkMode] = useState(true);

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger
          className={className}
          onClick={() => {
            setIsDarkMode((prev) => !prev);
            document.body.classList.toggle("dark");
          }}
        >
          {isDarkMode ? <Moon size={20} /> : <Sun size={20} />}
        </TooltipTrigger>

        <TooltipContent>
          {isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
