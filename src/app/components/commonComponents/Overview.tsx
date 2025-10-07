"use client";
import React from "react";

interface OverviewContent {
  title?: string;
  description?: string;
}

interface OverviewProps {
  content?: OverviewContent;
  color?: string;
}

const Overview: React.FC<OverviewProps> = ({
  content,
  color = "#00aaff", // default color if JSON has none
}) => {
  if (!content) return null;

  return (
    <section id="overview" className="my-4">
      {content.title && (
        <h2 className="section-title mb-2" style={{ borderColor: color }}>
          {content.title}
        </h2>
      )}
      {content.description && <p className="text-gray-700">{content.description}</p>}
    </section>
  );
};

export default Overview;
