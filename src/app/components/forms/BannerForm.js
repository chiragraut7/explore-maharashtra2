// FILE: components/forms/BannerForm.js
"use client";

import React, { useState } from "react";
import ImageUploader from "../ImageUploader";
import { v4 as uuidv4 } from "uuid";
import { FaUmbrellaBeach, FaStar, FaPalette } from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";

export default function BannerForm({ data = {}, onChange }) {
  const [formData, setFormData] = useState({
    id: data.id || uuidv4(),
    title: data.title || "",
    subtitle: data.subtitle || "",
    color: data.color || "#000000",
    rating: data.rating || "",
    amenities: data.amenities || [],
    bannerImage: data.bannerImage || "",
  });

  const amenitiesList = ["WiFi", "Parking", "Pool", "Restaurant"];

  const handleChange = (field, value) => {
    const updated = { ...formData, [field]: value };
    setFormData(updated);
    if (onChange) onChange(updated);
  };

  const handleAmenityToggle = (amenity) => {
    let updatedAmenities;
    if (formData.amenities.includes(amenity)) {
      updatedAmenities = formData.amenities.filter((a) => a !== amenity);
    } else {
      updatedAmenities = [...formData.amenities, amenity];
    }
    handleChange("amenities", updatedAmenities);
  };

  return (
    <div
      className="p-4 rounded-4 shadow-lg bg-white border-0 mb-4"
      style={{ borderLeft: `6px solid ${formData.color || "#0d6efd"}` }}
    >
      <h4 className="mb-4 text-primary fw-bold d-flex align-items-center gap-2">
        <FaUmbrellaBeach /> Banner & Basic Details
      </h4>

      <div className="row g-4">
        {/* Left Column */}
        <div className="col-md-6">
          {/* Title */}
          <div className="mb-3">
            <label className="form-label fw-semibold">Title</label>
            <input
              type="text"
              className="form-control shadow-sm"
              value={formData.title}
              placeholder="Enter destination title"
              onChange={(e) => handleChange("title", e.target.value)}
            />
          </div>

          {/* Subtitle */}
          <div className="mb-3">
            <label className="form-label fw-semibold">Subtitle</label>
            <input
              type="text"
              className="form-control shadow-sm"
              value={formData.subtitle}
              placeholder="Enter subtitle"
              onChange={(e) => handleChange("subtitle", e.target.value)}
            />
          </div>
        </div>

        {/* Right Column */}
        <div className="col-md-6">
          {/* Theme Color */}
          <div className="mb-3">
            <label className="form-label fw-semibold">
              <FaPalette className="me-2 text-secondary" />
              Theme Color
            </label>
            <input
              type="color"
              className="form-control form-control-color shadow-sm"
              value={formData.color}
              onChange={(e) => handleChange("color", e.target.value)}
            />
          </div>

          {/* Rating */}
          <div className="mb-3">
            <label className="form-label fw-semibold">
              <FaStar className="me-2 text-warning" />
              Rating
            </label>
            <input
              type="number"
              className="form-control shadow-sm"
              min="0"
              max="5"
              step="0.1"
              value={formData.rating}
              onChange={(e) => handleChange("rating", e.target.value)}
            />
          </div>

          {/* Amenities */}
          <div className="mb-3">
            <label className="form-label fw-semibold">Amenities</label>
            <div className="d-flex flex-wrap gap-3">
              {amenitiesList.map((amenity) => (
                <div
                  className="form-check"
                  key={amenity}
                  style={{ minWidth: "100px" }}
                >
                  <input
                    className="form-check-input"
                    type="checkbox"
                    checked={formData.amenities.includes(amenity)}
                    onChange={() => handleAmenityToggle(amenity)}
                  />
                  <label className="form-check-label">{amenity}</label>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <hr className="my-4" />

      {/* Banner Image Upload */}
      <ImageUploader
        label="Banner Image"
        image={formData.bannerImage}
        onChange={(img) => handleChange("bannerImage", img)}
        smallPreview
      />
    </div>
  );
}
