// FILE: components/forms/MarineLifeForm.js
import React from 'react';
import ImageUploader from '../ImageUploader';
import { FaPlus, FaTrash } from 'react-icons/fa';

export default function MarineLifeForm({ 
  data = { intro: '', items: [{ icon: '', title: '', description: '' }], conclusion: [''] }, 
  onChange 
}) {
  const updateRoot = (field, value) => onChange({ ...data, [field]: value });

  const updateItem = (i, field, value) => {
    const arr = [...(data.items || [])];
    arr[i] = { ...arr[i], [field]: value };
    onChange({ ...data, items: arr });
  };

  const addItem = () => onChange({ ...data, items: [...(data.items || []), { icon: '', title: '', description: '' }] });
  const removeItem = (i) => onChange({ ...data, items: (data.items || []).filter((_, idx) => idx !== i) });

  const updateConclusion = (index, value) => {
    const arr = [...(data.conclusion || [])];
    arr[index] = value;
    onChange({ ...data, conclusion: arr });
  };
  const addConclusion = () => onChange({ ...data, conclusion: [...(data.conclusion || []), ''] });
  const removeConclusion = (i) => onChange({ ...data, conclusion: (data.conclusion || []).filter((_, idx) => idx !== i) });

  return (
    <div className="card mb-4 shadow border-0">
      <div className="card-header bg-primary text-white fw-bold">
        🐠 Marine Life
      </div>
      <div className="card-body">
        
        {/* Intro */}
        <div className="mb-4">
          <label className="form-label fw-semibold">Intro</label>
          <textarea 
            className="form-control" 
            rows="2" 
            value={data.intro || ''} 
            onChange={e => updateRoot('intro', e.target.value)} 
          />
        </div>

        {/* Items */}
        {(data.items || []).map((it, i) => (
          <div key={i} className="border rounded p-3 mb-4 bg-light">
            <div className="row g-3">
              <div className="col-md-4">
                <label className="form-label">Icon</label>
                <ImageUploader value={it.icon} onChange={(img) => updateItem(i, 'icon', img)} />
              </div>
              <div className="col-md-4">
                <label className="form-label">Title</label>
                <input 
                  className="form-control" 
                  value={it.title || ''} 
                  onChange={e => updateItem(i, 'title', e.target.value)} 
                />
              </div>
              <div className="col-md-4">
                <label className="form-label">Description</label>
                <textarea 
                  className="form-control" 
                  rows="2" 
                  value={it.description || ''} 
                  onChange={e => updateItem(i, 'description', e.target.value)} 
                />
              </div>
            </div>
            <div className="text-end mt-2">
              <button className="btn btn-sm btn-outline-danger" onClick={() => removeItem(i)}>
                <FaTrash /> Remove
              </button>
            </div>
          </div>
        ))}

        <button className="btn btn-sm btn-outline-primary mb-4" onClick={addItem}>
          <FaPlus /> Add Marine Item
        </button>

        {/* Conclusions */}
        <h6 className="fw-bold mt-3">Conclusions</h6>
        {(data.conclusion || []).map((c, i) => (
          <div className="input-group mb-2" key={i}>
            <textarea 
              className="form-control" 
              value={c || ''} 
              onChange={e => updateConclusion(i, e.target.value)} 
            />
            <button className="btn btn-outline-danger" onClick={() => removeConclusion(i)}>
              <FaTrash />
            </button>
          </div>
        ))}
        <button className="btn btn-sm btn-primary" onClick={addConclusion}>
          <FaPlus /> Add Conclusion
        </button>
      </div>
    </div>
  );
}
