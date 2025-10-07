"use client";
import React from "react";
import { Form, Button, Card } from "react-bootstrap";
import { FaImages, FaTrash, FaPlus } from "react-icons/fa";
import ImageUploader from "../ImageUploader";

export default function GalleryForm({ data = [], onChange }) {
  const updateImage = (i, field, value) => {
    const arr = [...data];
    arr[i] = { ...arr[i], [field]: value };
    onChange(arr);
  };

  const addImage = () =>
    onChange([...(data || []), { src: "", thumb: "", alt: "" }]);

  const removeImage = (i) =>
    onChange(data.filter((_, idx) => idx !== i));

  const handleMultiUpload = (base64Array) => {
    const arr = data ? [...data] : [];
    base64Array.forEach((b) =>
      arr.push({ src: b, thumb: b, alt: "" })
    );
    onChange(arr);
  };

  return (
    <Card className="mb-4 border-0 shadow-lg rounded-4 overflow-hidden">
      <Card.Body className="p-4">
        {/* Section Title */}
        <h4 className="card-title d-flex align-items-center mb-4 fw-bold text-primary">
          <FaImages className="me-2" /> Destination Gallery
        </h4>

        {/* Bulk Upload */}
        <Form.Group className="mb-4">
          <Form.Label className="fw-semibold">Bulk Upload Images</Form.Label>
          <div className="p-3 border border-2 rounded-4 bg-light shadow-sm">
            <ImageUploader multiple accept="image/*" onChange={handleMultiUpload} />
            <small className="text-muted">
              You can select multiple images at once.
            </small>
          </div>
        </Form.Group>

        {/* Images List */}
        {(data || []).map((g, i) => (
          <Card
            key={i}
            className="mb-3 border-0 shadow-sm rounded-4 overflow-hidden gallery-card"
            style={{
              transition: "transform 0.2s ease, box-shadow 0.2s ease",
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.transform = "translateY(-3px)";
              e.currentTarget.style.boxShadow =
                "0 6px 18px rgba(0,0,0,0.15)";
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow =
                "0 4px 12px rgba(0,0,0,0.1)";
            }}
          >
            <div className="d-flex flex-wrap align-items-start">
              {/* Image Preview */}
              <div
                className="p-2 bg-white border-end"
                style={{ width: 160, minHeight: 120 }}
              >
                {g.src ? (
                  <img
                    src={g.src}
                    alt={g.alt || `img-${i}`}
                    className="img-fluid rounded-3 shadow-sm"
                    style={{
                      height: "100%",
                      objectFit: "cover",
                      transition: "transform 0.3s ease",
                    }}
                    onMouseOver={(e) =>
                      (e.currentTarget.style.transform = "scale(1.05)")
                    }
                    onMouseOut={(e) =>
                      (e.currentTarget.style.transform = "scale(1)")
                    }
                  />
                ) : (
                  <div className="text-muted text-center small pt-4">
                    No Image
                  </div>
                )}
              </div>

              {/* Image Fields */}
              <div className="flex-grow-1 p-3 bg-light">
                <Form.Group className="mb-3">
                  <Form.Label>Image URL (src)</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Image URL or base64"
                    value={g.src || ""}
                    onChange={(e) => updateImage(i, "src", e.target.value)}
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Thumbnail URL (thumb)</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Thumbnail URL"
                    value={g.thumb || ""}
                    onChange={(e) => updateImage(i, "thumb", e.target.value)}
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Alt Text</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Short description for SEO"
                    value={g.alt || ""}
                    onChange={(e) => updateImage(i, "alt", e.target.value)}
                  />
                </Form.Group>

                {/* Remove Button */}
                <Button
                  variant="outline-danger"
                  size="sm"
                  className="rounded-pill px-3"
                  onClick={() => removeImage(i)}
                >
                  <FaTrash className="me-1" /> Remove
                </Button>
              </div>
            </div>
          </Card>
        ))}

        {/* Add Image */}
        <Button
          variant="primary"
          size="sm"
          className="rounded-pill px-3 mt-2 shadow-sm"
          onClick={addImage}
        >
          <FaPlus className="me-1" /> Add Gallery Image
        </Button>
      </Card.Body>
    </Card>
  );
}
