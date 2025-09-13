import React, { useState } from 'react';
import { Form, Button, Image, Alert } from 'react-bootstrap';

const ImageUpload = ({ 
  onFileSelect, 
  currentImage, 
  label = "Choose Image", 
  accept = "image/*",
  required = false,
  error = null 
}) => {
  const [preview, setPreview] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      
      // Create preview
      const reader = new FileReader();
      reader.onload = (e) => {
        setPreview(e.target.result);
      };
      reader.readAsDataURL(file);
      
      // Call parent callback
      if (onFileSelect) {
        onFileSelect(file);
      }
    }
  };

  const clearImage = () => {
    setSelectedFile(null);
    setPreview(null);
    if (onFileSelect) {
      onFileSelect(null);
    }
  };

  return (
    <div>
      <Form.Group className="mb-3">
        <Form.Label>{label} {required && <span className="text-danger">*</span>}</Form.Label>
        <Form.Control
          type="file"
          accept={accept}
          onChange={handleFileChange}
          isInvalid={!!error}
        />
        {error && (
          <Form.Control.Feedback type="invalid">
            {error}
          </Form.Control.Feedback>
        )}
      </Form.Group>

      {/* Current Image */}
      {currentImage && !preview && (
        <div className="mb-3">
          <p className="text-muted">Current Image:</p>
          <Image 
            src={currentImage} 
            alt="Current" 
            style={{ maxHeight: '200px', maxWidth: '100%' }}
            className="border rounded"
          />
        </div>
      )}

      {/* Preview */}
      {preview && (
        <div className="mb-3">
          <p className="text-muted">Preview:</p>
          <div className="position-relative d-inline-block">
            <Image 
              src={preview} 
              alt="Preview" 
              style={{ maxHeight: '200px', maxWidth: '100%' }}
              className="border rounded"
            />
            <Button
              variant="danger"
              size="sm"
              className="position-absolute top-0 end-0 m-1"
              onClick={clearImage}
              style={{ borderRadius: '50%', width: '30px', height: '30px', padding: 0 }}
            >
              ×
            </Button>
          </div>
        </div>
      )}

      {selectedFile && (
        <Alert variant="info" className="mt-2">
          Selected: {selectedFile.name} ({(selectedFile.size / 1024 / 1024).toFixed(2)} MB)
        </Alert>
      )}
    </div>
  );
};

export default ImageUpload;

