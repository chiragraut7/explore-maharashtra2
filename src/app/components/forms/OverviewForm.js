// FILE: components/forms/OverviewForm.js
"use client";
import React from "react";
import { FaInfoCircle } from "react-icons/fa";

export default function OverviewForm({ data, onChange }) {
  return (
    <div className="card mb-4 border-0 shadow-lg rounded-3">
      <div
        className="card-header text-white d-flex align-items-center"
        style={{
          background: "linear-gradient(135deg, #007bff, #00bfff)",
          borderTopLeftRadius: "12px",
          borderTopRightRadius: "12px",
        }}
      >
        <FaInfoCircle className="me-2" size={20} />
        <h5 className="mb-0">Overview</h5>
      </div>
      <div className="card-body bg-light">
        <div className="mb-3">
          <label className="form-label fw-semibold">Overview Text</label>
          <textarea
            className="form-control shadow-sm"
            style={{
              borderRadius: "8px",
              borderColor: "#ced4da",
              resize: "vertical",
              minHeight: "150px",
            }}
            placeholder="Write a compelling overview about this destination..."
            rows="5"
            value={data || ""}
            onChange={(e) => onChange(e.target.value)}
          />
        </div>
      </div>
    </div>
  );
}
