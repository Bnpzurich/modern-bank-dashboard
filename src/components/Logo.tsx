
import React from 'react';

export function Logo({ color = "white", size = "md" }: { color?: "white" | "dark"; size?: "sm" | "md" | "lg" }) {
  const textColor = color === "white" ? "text-white" : "text-bank-900";
  const sizeClasses = {
    sm: "text-lg",
    md: "text-xl",
    lg: "text-2xl"
  };

  return (
    <div className={`font-heading font-semibold tracking-tight ${textColor} ${sizeClasses[size]} flex items-center gap-1.5`}>
      <div className={`rounded bg-gradient-to-r from-bank-500 to-bank-700 flex items-center justify-center ${size === "sm" ? "w-6 h-6" : size === "md" ? "w-7 h-7" : "w-8 h-8"}`}>
        <span className="text-white font-bold">B</span>
      </div>
      <span>BankModern</span>
    </div>
  );
}
