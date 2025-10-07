"use client";
import React from "react";

interface SectionTitleProps {
  title: string;
  color?: string;
  className?: string;
}

const SectionTitle: React.FC<SectionTitleProps> = ({
  title,
  color = "#00aaff", // fallback default color
  className = "",
}) => {
  return (
    <h2
      className={`section-title border-l-4 pl-3 font-semibold text-2xl mb-4 ${className}`}
      style={{
        borderColor: color,
        // color: color,
      }}
    >
      {title}
    </h2>
  );
};

export default SectionTitle;
