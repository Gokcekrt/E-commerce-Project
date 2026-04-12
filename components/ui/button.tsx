import React from "react";
import { Slot } from "@radix-ui/react-slot";

interface ButtonProps {
  onClick?: () => void;
  // Buraya "outline" ve "destructive" ekledim
  variant?:
    | "primary"
    | "secondary"
    | "ghost"
    | "themeBtn"
    | "outline"
    | "destructive";
  className?: string;
  children: React.ReactNode;
  type?: "button" | "submit" | "reset";
  asChild?: boolean;
}

export function Button({
  asChild = false,
  onClick,
  variant = "primary",
  className = "",
  children,
  type = "button",
}: ButtonProps) {
  let variantStyles = "";
  switch (variant) {
    case "primary":
      variantStyles = "bg-indigo-500 text-indigo-100 hover:bg-indigo-500/50";
      break;
    case "secondary":
      variantStyles =
        "bg-[#6366F1] text-slate-100 shadow-[0_0_30px_0px_rgba(35,40,88,0.5)] hover:bg-[#5558e3] hover:shadow-[0_0_40px_0px_rgba(35,40,88,0.7)] transition-all duration-300 active:scale-95";
      break;
    case "outline":
      variantStyles =
        "border border-slate-300 bg-transparent hover:bg-slate-100 text-slate-900";
      break;
    case "destructive":
      variantStyles = "bg-red-500 text-white hover:bg-red-600";
      break;
    case "ghost":
      variantStyles =
        "bg-transparent text-md text-red-600 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-[#5558e3]";
      break;
    case "themeBtn":
      variantStyles =
        "bg-transparent hover:bg-slate-100 dark:hover:bg-white/10";
      break;
    default:
      variantStyles = "bg-indigo-500 text-white";
      break;
  }

  const Comp = asChild ? Slot : "button";
  return (
    <Comp
      type={asChild ? undefined : type}
      onClick={onClick}
      className={`py-2 px-4 rounded-md cursor-pointer transition-colors ${variantStyles} ${className}`}
    >
      {children}
    </Comp>
  );
}
