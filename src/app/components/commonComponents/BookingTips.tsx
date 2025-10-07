"use client";
import React from "react";
import SectionTitle from "./SectionTitle";

interface Tip {
  icon?: string;
  title?: string;
  description?: string;
  [key: string]: any;
}

export default function BookingTips({ tips = [] }: { tips?: Tip[] }) {
  if (!tips.length) return null;

  return (
    <section id="booking-tips" className="mb-5">
      <SectionTitle title="Hotel Booking Tips" />
      <div className="card p-4">
      <div className="tips icon-list space-y-2">
        {tips.map((tip, idx) => (
          <div key={idx} className="flex items-start text-gray-800 ">
            {tip.icon && <i className={`${tip.icon} mt-1 attraction-icon`}></i>}
            <span>
              {tip.title && <strong>{tip.title}: </strong>}
              {tip.description}
            </span>
          </div>
        ))}
        </div>
      </div>
    </section>
  );
}
