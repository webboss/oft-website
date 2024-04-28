import React from "react";

const variants = {
  "blue-to-red": "gradient-blue-to-red",
  "yellow-to-blue": "gradient-yellow-to-blue",
};
interface HrProps {
  variant?: keyof typeof variants;
  className?: string;
}
export const Hr = ({ variant = "blue-to-red", className }: HrProps) => {
  return (
    <hr
      aria-label="horizontal-rule"
      className={` h-[2px] border-0 bg-gradient-to-r from-[#1657C7]
    to-[#F1221A] ${className}`}
    />
  );
};
