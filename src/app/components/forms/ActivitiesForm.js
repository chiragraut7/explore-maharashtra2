"use client";

import React from "react";
import ImageUploader from "../ImageUploader";
import { FaPlus, FaTrash, FaListUl } from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";

export default function ActivitiesForm({ data = [], onChange }) {
  const updateActivity = (index, field, value) => {
    const arr = [...data];
    arr[index] = { ...arr[index], [field]: value };
    onChange(arr);
  };

  const addDetail = (aIndex) => {
    const arr = [...data];
    arr[aIndex].details = arr[aIndex].details
      ? [...arr[aIndex].details, { label: "", value: "" }]
      : [{ label: "", value: "" }];
    onChange(arr);
  };

  const updateDetail = (aIndex, dIndex, field, value) => {
    const arr = [...data];
    arr[aIndex].details[dIndex] = {
      ...arr[aIndex].details[dIndex],
      [field]: value,
    };
    onChange(arr);
  };

  const addActivity = () =>
    onChange([
      ...(data || []),
      { icon: "", title: "", description: "", details: [{ label: "", value: "" }] },
    ]);

  const removeActivity = (i) => onChange(data.filter((_, idx) => idx !== i));

  const removeDetail = (aIndex, dIndex) => {
    const arr = [...data];
    arr[aIndex].details = arr[aIndex].details.filter((_, idx) => idx !== dIndex);
    onChange(arr);
  };

  return (
    <div className="card shadow border-0 mb-4">
      <div
        className="card-header text-white"
        style={{
          background: "linear-gradient(90deg, #007bff, #00c6ff)",
        }}
      >
        <h4 className="mb-0 d-flex align-items-center">
          <FaListUl className="me-2" /> Activities
        </h4>
      </div>

      <div className="card-body">
        {(data || []).map((a, i) => (
          <div
            className="p-4 mb-4 rounded shadow-sm"
            style={{ background: "#ffffff", border: "1px solid #e9ecef" }}
            key={i}
          >
            <div className="row g-3">
              <div className="col-md-4">
                <label className="form-label fw-bold text-secondary">Activity Icon</label>
                <ImageUploader
                  value={a.icon}
                  onChange={(img) => updateActivity(i, "icon", img)}
                />
              </div>

              <div className="col-md-4">
                <label className="form-label fw-bold text-secondary">Title</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter activity title"
                  value={a.title || ""}
                  onChange={(e) => updateActivity(i, "title", e.target.value)}
                />
              </div>

              <div className="col-md-4">
                <label className="form-label fw-bold text-secondary">Description</label>
                <textarea
                  className="form-control"
                  rows="2"
                  placeholder="Short description..."
                  value={a.description || ""}
                  onChange={(e) =>
                    updateActivity(i, "description", e.target.value)
                  }
                />
              </div>
            </div>

            <div className="mt-4">
              <h6 className="fw-bold text-primary">Details</h6>
              {(a.details || []).map((d, di) => (
                <div key={di} className="row g-2 align-items-center mb-2">
                  <div className="col-md-5">
                    <input
                      className="form-control"
                      placeholder="Label"
                      value={d.label || ""}
                      onChange={(e) =>
                        updateDetail(i, di, "label", e.target.value)
                      }
                    />
                  </div>
                  <div className="col-md-5">
                    <input
                      className="form-control"
                      placeholder="Value"
                      value={d.value || ""}
                      onChange={(e) =>
                        updateDetail(i, di, "value", e.target.value)
                      }
                    />
                  </div>
                  <div className="col-md-2 text-end">
                    <button
                      className="btn btn-outline-danger btn-sm w-100"
                      onClick={() => removeDetail(i, di)}
                    >
                      <FaTrash /> Remove
                    </button>
                  </div>
                </div>
              ))}
              <button
                className="btn btn-outline-primary btn-sm mt-2"
                onClick={() => addDetail(i)}
              >
                <FaPlus /> Add Detail
              </button>
            </div>

            <div className="mt-3 text-end">
              <button
                className="btn btn-danger btn-sm"
                onClick={() => removeActivity(i)}
              >
                <FaTrash /> Remove Activity
              </button>
            </div>
          </div>
        ))}

        <div className="text-end">
          <button className="btn btn-success" onClick={addActivity}>
            <FaPlus /> Add Activity
          </button>
        </div>
      </div>
    </div>
  );
}
