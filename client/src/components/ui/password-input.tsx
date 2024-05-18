"use client";
import * as React from "react";
import { Input } from "./input";
import { Eye, EyeIcon, EyeOff } from "lucide-react";
import { cn } from "@/lib/utils";

export interface PasswordInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const PasswordInput = React.forwardRef<HTMLInputElement, PasswordInputProps>(
  ({ className, type, ...props }, ref) => {
    const [showPassword, setShowPassword] = React.useState(false);
    return (
      <div className="relative">
        <Input
          type={showPassword ? "text" : "password"}
          {...props}
          ref={ref}
          className={cn("pr-10", className)}
          placeholder="********"
        />
        <span
          className="absolute top-[7px] right-1 cursor-pointer select-none"
          onClick={() => setShowPassword(!showPassword)}
        >
          {showPassword ? <EyeIcon /> : <EyeOff />}
        </span>
      </div>
    );
  }
);
PasswordInput.displayName = "Input";

export { PasswordInput };
