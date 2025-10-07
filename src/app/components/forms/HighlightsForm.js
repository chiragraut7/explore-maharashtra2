// FILE: components/forms/HighlightsForm.js
"use client";
import React from "react";
import ImageUploader from "../ImageUploader";
import { FaStar, FaPlus, FaTrash } from "react-icons/fa";

export default function HighlightsForm({ data = [], onChange }) {
  const updateItem = (index, field, value) => {
    const copied = [...data];
    copied[index] = { ...copied[index], [field]: value };
    onChange(copied);
  };

  const add = () =>
    onChange([
      ...(data || []),
      { icon: "", title: "", description: "" },
    ]);

  const remove = (index) =>
    onChange(data.filter((_, i) => i !== index));

  return (
    <div className="card mb-4 shadow border-0 rounded-3">
      <div
        className="card-header text-white d-flex align-items-center"
        style={{
          background: "linear-gradient(135deg, #f39c12, #e67e22)",
          borderTopLeftRadius: "12px",
          borderTopRightRadius: "12px",
        }}
      >
        <FaStar className="me-2" /> <h5 className="mb-0">Highlights</h5>
      </div>

      <div className="card-body">
        {(data || []).map((h, i) => (
          <div
            className="p-3 bg-light rounded mb-3 shadow-sm"
            key={i}
          >
            <div className="row g-3 align-items-start">
              {/* Small Thumbnail Icon */}
              <div className="col-md-2 text-center">
                <label className="form-label fw-bold">Icon</label>
                <div
                  style={{
                    width: "60px",
                    height: "60px",
                    border: "1px solid #ccc",
                    borderRadius: "8px",
                    overflow: "hidden",
                    margin: "0 auto",
                  }}
                >
                  {h.icon ? (
                    <img
                      src={h.icon}
                      alt="icon"
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                      }}
                    />
                  ) : (
                    <span
                      style={{
                        fontSize: "12px",
                        color: "#888",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        height: "100%",
                      }}
                    >
                      No Image
                    </span>
                  )}
                </div>
                <div className="mt-2 noimg">
                  <ImageUploader
                    value={h.icon}
                    onChange={(img) => updateItem(i, "icon", img)}
                  />
                </div>
              </div>

              {/* Title */}
              <div className="col-md-4">
                <label className="form-label fw-bold">Title</label>
                <input
                  className="form-control"
                  placeholder="Enter title..."
                  value={h.title || ""}
                  onChange={(e) =>
                    updateItem(i, "title", e.target.value)
                  }
                />
              </div>

              {/* Description */}
              <div className="col-md-5">
                <label className="form-label fw-bold">Description</label>
                <textarea
                  className="form-control"
                  rows="2"
                  placeholder="Enter description..."
                  value={h.description || ""}
                  onChange={(e) =>
                    updateItem(i, "description", e.target.value)
                  }
                />
              </div>

              {/* Remove Button */}
              <div className="col-md-1 d-flex align-items-end">
                <button
                  type="button"
                  className="btn btn-outline-danger btn-sm w-100"
                  onClick={() => remove(i)}
                >
                  <FaTrash />
                </button>
              </div>
            </div>
          </div>
        ))}

        {/* Add Button */}
        <button
          type="button"
          className="btn btn-primary"
          onClick={add}
        >
          <FaPlus className="me-1" /> Add Highlight
        </button>
      </div>
    </div>
  );
}
