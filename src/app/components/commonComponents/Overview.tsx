"use client";
import React from "react";

interface OverviewProps {
  content?: string;
  color?: string;
}

const Overview: React.FC<OverviewProps> = ({
  content = "Overview not available",
  color = "#00aaff", // default color if JSON has none
}) => {
  if (!content) return null;

  return (
    <section id="overview" className="my-4">
      <h2
        className="section-title"
        style={{ borderColor: color }}
      >
        Overview
      </h2>
      <p>{content}</p>
    </section>
  );
};

export default Overview;
