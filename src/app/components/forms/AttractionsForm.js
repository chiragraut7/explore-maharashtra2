"use client";
import React from "react";
import ImageUploader from "../ImageUploader";
import { FaMapMarkedAlt, FaTrash, FaPlus } from "react-icons/fa";

export default function AttractionsForm({ data = [], onChange }) {
  const updateAttraction = (i, field, value) => {
    const arr = [...data];
    arr[i] = { ...arr[i], [field]: value };
    onChange(arr);
  };

  const add = () =>
    onChange([
      ...(data || []),
      {
        image: "",
        title: "",
        description: "",
        icon: "",
        label: "",
        value: "",
        color: "#ff0000",
      },
    ]);

  const remove = (i) => onChange(data.filter((_, idx) => idx !== i));

  return (
    <div className="card mb-4 shadow-lg border-0 rounded-4 overflow-hidden">
      <div className="card-header bg-gradient text-white d-flex align-items-center fs-5 fw-bold"
        style={{ background: "linear-gradient(90deg, #007bff, #00bcd4)" }}>
        <FaMapMarkedAlt className="me-2 fs-4" /> Attractions
      </div>

      <div className="card-body">
        {(data || []).map((at, i) => (
          <div
            key={i}
            className="p-4 mb-4 rounded-4 shadow-sm border bg-white hover-shadow"
            style={{ transition: "0.3s ease" }}
          >
            {/* Image Upload */}
            <div className="mb-3">
              <label className="form-label fw-semibold text-primary">
                Main Image
              </label>
              <ImageUploader
                value={at.image}
                onChange={(img) => updateAttraction(i, "image", img)}
              />
            </div>

            {/* Title & Description */}
            <div className="row">
              <div className="col-md-6 mb-3">
                <label className="form-label fw-semibold">Title</label>
                <input
                  className="form-control form-control-lg"
                  value={at.title || ""}
                  onChange={(e) =>
                    updateAttraction(i, "title", e.target.value)
                  }
                  placeholder="Enter attraction title"
                />
              </div>
              <div className="col-md-6 mb-3">
                <label className="form-label fw-semibold">Description</label>
                <textarea
                  className="form-control"
                  rows="2"
                  value={at.description || ""}
                  onChange={(e) =>
                    updateAttraction(i, "description", e.target.value)
                  }
                  placeholder="Short description"
                />
              </div>
            </div>

            {/* Icon, Label, Value, Color */}
            <div className="row align-items-end">
              <div className="col-md-3 mb-3">
                <label className="form-label fw-semibold">Icon URL/Base64</label>
                <input
                  className="form-control"
                  placeholder="Icon link"
                  value={at.icon || ""}
                  onChange={(e) => updateAttraction(i, "icon", e.target.value)}
                />
              </div>
              <div className="col-md-3 mb-3">
                <label className="form-label fw-semibold">Label</label>
                <input
                  className="form-control"
                  placeholder="e.g. Location"
                  value={at.label || ""}
                  onChange={(e) => updateAttraction(i, "label", e.target.value)}
                />
              </div>
              <div className="col-md-3 mb-3">
                <label className="form-label fw-semibold">Value</label>
                <input
                  className="form-control"
                  placeholder="e.g. Goa, India"
                  value={at.value || ""}
                  onChange={(e) => updateAttraction(i, "value", e.target.value)}
                />
              </div>
              <div className="col-md-3 mb-3">
                <label className="form-label fw-semibold">Color</label>
                <input
                  type="color"
                  className="form-control form-control-color"
                  value={at.color || "#ff0000"}
                  onChange={(e) => updateAttraction(i, "color", e.target.value)}
                />
              </div>
            </div>

            {/* Action Buttons */}
            <div className="d-flex justify-content-end mt-2">
              <button
                type="button"
                className="btn btn-outline-danger btn-sm"
                onClick={() => remove(i)}
              >
                <FaTrash className="me-1" /> Remove
              </button>
            </div>
          </div>
        ))}

        {/* Add Button */}
        <button
          type="button"
          className="btn btn-success btn-lg px-4 rounded-pill shadow-sm"
          onClick={add}
        >
          <FaPlus className="me-2" /> Add Attraction
        </button>
      </div>
    </div>
  );
}
