"use client";
import React from "react";
import ImageUploader from "../ImageUploader";
import {
  FaMapMarkedAlt,
  FaInfoCircle,
  FaThermometerHalf,
  FaTrash,
  FaPlus,
} from "react-icons/fa";

export default function GeographyForm({ data = {}, onChange }) {
  const update = (path, value) => {
    const copied = { ...data };
    const keys = path.split(".");
    let cur = copied;
    for (let i = 0; i < keys.length - 1; i++) {
      if (!cur[keys[i]]) cur[keys[i]] = {};
      cur = cur[keys[i]];
    }
    cur[keys[keys.length - 1]] = value;
    onChange(copied);
  };

  const addDetail = () => {
    const arr = Array.isArray(data.details) ? [...data.details] : [];
    arr.push({ icon: "", label: "", value: "" });
    update("details", arr);
  };

  const updateDetail = (index, field, value) => {
    const arr = [...(data.details || [])];
    arr[index] = { ...arr[index], [field]: value };
    update("details", arr);
  };

  const removeDetail = (index) => {
    update(
      "details",
      (data.details || []).filter((_, i) => i !== index)
    );
  };

  const addSeason = () => {
    const arr = Array.isArray(data.climate?.seasons)
      ? [...data.climate.seasons]
      : [];
    arr.push({ icon: "", text: "" });
    update("climate.seasons", arr);
  };

  const updateSeason = (index, field, value) => {
    const arr = [...(data.climate?.seasons || [])];
    arr[index] = { ...arr[index], [field]: value };
    update("climate.seasons", arr);
  };

  const removeSeason = (index) => {
    update(
      "climate.seasons",
      (data.climate?.seasons || []).filter((_, i) => i !== index)
    );
  };

  return (
    <div className="card mb-4 border-0 shadow-lg rounded-4">
      <div className="card-body">
        <h3 className="card-title d-flex align-items-center mb-4 fw-bold text-primary">
          <FaMapMarkedAlt className="me-2" /> Geography
        </h3>

        {/* Image Section */}
        <div className="p-3 rounded-3 mb-4 border bg-light">
          <label className="form-label fw-semibold">
            <FaInfoCircle className="me-2 text-secondary" /> Image
          </label>
          <ImageUploader
            smallPreview // <-- make thumbnail size
            value={data.image}
            onChange={(img) => update("image", img)}
          />
        </div>

        {/* Intro */}
        <div className="mb-4">
          <label className="form-label fw-semibold">Intro</label>
          <textarea
            className="form-control rounded-3"
            rows="3"
            placeholder="Enter introduction..."
            value={data.intro || ""}
            onChange={(e) => update("intro", e.target.value)}
          />
        </div>

        {/* Details */}
        <h5 className="fw-bold text-primary mb-3">Details</h5>
        {(data.details || []).map((d, i) => (
          <div
            key={i}
            className="p-3 bg-white border rounded-3 mb-3 shadow-sm"
          >
            <div className="row g-2">
              <div className="col-md-4">
                <input
                  className="form-control"
                  placeholder="Icon URL"
                  value={d.icon || ""}
                  onChange={(e) => updateDetail(i, "icon", e.target.value)}
                />
              </div>
              <div className="col-md-3">
                <input
                  className="form-control"
                  placeholder="Label"
                  value={d.label || ""}
                  onChange={(e) => updateDetail(i, "label", e.target.value)}
                />
              </div>
              <div className="col-md-3">
                <input
                  className="form-control"
                  placeholder="Value"
                  value={d.value || ""}
                  onChange={(e) => updateDetail(i, "value", e.target.value)}
                />
              </div>
              <div className="col-md-2 d-flex align-items-center justify-content-end">
                <button
                  className="btn btn-outline-danger rounded-circle"
                  onClick={() => removeDetail(i)}
                >
                  <FaTrash />
                </button>
              </div>
            </div>
          </div>
        ))}
        <button className="btn btn-success mb-4 rounded-pill" onClick={addDetail}>
          <FaPlus className="me-1" /> Add Detail
        </button>

        {/* Climate */}
        <h5 className="fw-bold text-primary mb-3">
          <FaThermometerHalf className="me-2" /> Climate
        </h5>
        <div className="mb-3">
          <label className="form-label fw-semibold">Description</label>
          <textarea
            className="form-control rounded-3"
            rows="2"
            placeholder="Describe the climate..."
            value={data.climate?.description || ""}
            onChange={(e) => update("climate.description", e.target.value)}
          />
        </div>

        {(data.climate?.seasons || []).map((s, i) => (
          <div
            key={i}
            className="p-3 bg-white border rounded-3 mb-3 shadow-sm"
          >
            <div className="row g-2">
              <div className="col-md-4">
                <input
                  className="form-control"
                  placeholder="Icon URL"
                  value={s.icon || ""}
                  onChange={(e) => updateSeason(i, "icon", e.target.value)}
                />
              </div>
              <div className="col-md-6">
                <input
                  className="form-control"
                  placeholder="Season Text"
                  value={s.text || ""}
                  onChange={(e) => updateSeason(i, "text", e.target.value)}
                />
              </div>
              <div className="col-md-2 d-flex align-items-center justify-content-end">
                <button
                  className="btn btn-outline-danger rounded-circle"
                  onClick={() => removeSeason(i)}
                >
                  <FaTrash />
                </button>
              </div>
            </div>
          </div>
        ))}
        <button className="btn btn-success mb-4 rounded-pill" onClick={addSeason}>
          <FaPlus className="me-1" /> Add Season
        </button>

        {/* Conclusion */}
        <div>
          <label className="form-label fw-semibold">Conclusion</label>
          <textarea
            className="form-control rounded-3"
            rows="2"
            placeholder="Enter concluding notes..."
            value={data.conclusion || ""}
            onChange={(e) => update("conclusion", e.target.value)}
          />
        </div>
      </div>
    </div>
  );
}
