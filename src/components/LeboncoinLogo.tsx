
import React from 'react';

export function LeboncoinLogo({ size = "md" }: { size?: "sm" | "md" | "lg" }) {
  const sizeClasses = {
    sm: "text-lg",
    md: "text-xl",
    lg: "text-2xl"
  };

  return (
    <div className={`font-heading font-semibold tracking-tight text-orange-500 ${sizeClasses[size]} flex items-center`}>
      <span className="font-bold">leboncoin</span>
    </div>
  );
}
