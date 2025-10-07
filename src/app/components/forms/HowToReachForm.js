// FILE: components/forms/HowToReachForm.js
"use client";
import React from "react";
import { FaRoute, FaPlus, FaTrash, FaTimes } from "react-icons/fa";

export default function HowToReachForm({ data = [], onChange }) {
  const updateMode = (i, field, value) => {
    const arr = [...data];
    arr[i] = { ...arr[i], [field]: value };
    onChange(arr);
  };

  const addDetail = (i) => {
    const arr = [...data];
    arr[i].details = arr[i].details ? [...arr[i].details, ""] : [""];
    onChange(arr);
  };

  const updateDetail = (i, di, value) => {
    const arr = [...data];
    arr[i].details = [...arr[i].details];
    arr[i].details[di] = value;
    onChange(arr);
  };

  const addMode = () =>
    onChange([
      ...(data || []),
      { icon: "", title: "", details: [""] },
    ]);

  const removeMode = (i) =>
    onChange(data.filter((_, idx) => idx !== i));

  const removeDetail = (i, di) => {
    const arr = [...data];
    arr[i].details = arr[i].details.filter((_, idx) => idx !== di);
    onChange(arr);
  };

  return (
    <div className="card mb-4 shadow border-0 rounded-3">
      <div className="card-body">
        <h4 className="card-title d-flex align-items-center mb-4">
          <FaRoute className="text-primary me-2" /> How To Reach
        </h4>

        {(data || []).map((h, i) => (
          <div
            key={i}
            className="p-3 bg-light rounded shadow-sm mb-3"
          >
            {/* Icon */}
            <div className="mb-2">
              <label className="form-label fw-bold">
                Icon (URL or class)
              </label>
              <input
                className="form-control"
                placeholder="Enter icon URL or name..."
                value={h.icon || ""}
                onChange={(e) =>
                  updateMode(i, "icon", e.target.value)
                }
              />
            </div>

            {/* Title */}
            <div className="mb-2">
              <label className="form-label fw-bold">Title</label>
              <input
                className="form-control"
                placeholder="e.g., By Road, By Train, By Air"
                value={h.title || ""}
                onChange={(e) =>
                  updateMode(i, "title", e.target.value)
                }
              />
            </div>

            {/* Details */}
            <h6 className="fw-bold mt-3">Details</h6>
            {(h.details || []).map((d, di) => (
              <div
                className="d-flex gap-2 align-items-start mb-2"
                key={di}
              >
                <input
                  className="form-control"
                  placeholder="Enter travel detail..."
                  value={d || ""}
                  onChange={(e) =>
                    updateDetail(i, di, e.target.value)
                  }
                />
                <button
                  type="button"
                  className="btn btn-outline-danger btn-sm"
                  onClick={() => removeDetail(i, di)}
                >
                  <FaTimes />
                </button>
              </div>
            ))}

            {/* Add Detail Button */}
            <div className="mb-2">
              <button
                type="button"
                className="btn btn-outline-primary btn-sm me-2"
                onClick={() => addDetail(i)}
              >
                <FaPlus className="me-1" /> Add Detail
              </button>

              {/* Remove Mode */}
              <button
                type="button"
                className="btn btn-danger btn-sm"
                onClick={() => removeMode(i)}
              >
                <FaTrash className="me-1" /> Remove Mode
              </button>
            </div>
          </div>
        ))}

        {/* Add Transport Mode */}
        <button
          type="button"
          className="btn btn-primary"
          onClick={addMode}
        >
          <FaPlus className="me-1" /> Add Transport Mode
        </button>
      </div>
    </div>
  );
}
