"use client";
import React from "react";
import { Form, Button } from "react-bootstrap";
import { FaLightbulb, FaTrash, FaPlus } from "react-icons/fa";
import ImageUploader from "../ImageUploader";

export default function BookingTipsForm({ data = [], onChange }) {
  const updateTip = (i, field, value) => {
    const arr = [...data];
    arr[i] = { ...arr[i], [field]: value };
    onChange(arr);
  };

  const add = () =>
    onChange([
      ...(data || []),
      { icon: "", title: "", description: "" },
    ]);

  const remove = (i) => onChange(data.filter((_, idx) => idx !== i));

  return (
    <div className="card mb-4 shadow-lg border-0 rounded-3">
      <div className="card-body p-4">
        {/* Header */}
        <h4 className="card-title d-flex align-items-center mb-4 text-primary fw-bold">
          <FaLightbulb className="text-warning me-2" size={24} />
          Booking Tips
        </h4>

        {/* Tip Items */}
        {(data || []).map((t, i) => (
          <div
            className="border rounded-3 p-4 mb-4 bg-light shadow-sm position-relative"
            key={i}
          >
            <Form.Group className="mb-3">
              <Form.Label className="fw-semibold">Tip Icon</Form.Label>
              <ImageUploader
                value={t.icon}
                onChange={(img) => updateTip(i, "icon", img)}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label className="fw-semibold">Title</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter tip title"
                value={t.title || ""}
                onChange={(e) => updateTip(i, "title", e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label className="fw-semibold">Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={2}
                placeholder="Write a short booking tip..."
                value={t.description || ""}
                onChange={(e) => updateTip(i, "description", e.target.value)}
              />
            </Form.Group>

            <Button
              variant="outline-danger"
              size="sm"
              className="mt-2"
              onClick={() => remove(i)}
            >
              <FaTrash className="me-1" /> Remove Tip
            </Button>
          </div>
        ))}

        {/* Add Button */}
        <div className="text-end">
          <Button
            variant="success"
            size="sm"
            className="fw-semibold shadow-sm"
            onClick={add}
          >
            <FaPlus className="me-1" /> Add Booking Tip
          </Button>
        </div>
      </div>
    </div>
  );
}
