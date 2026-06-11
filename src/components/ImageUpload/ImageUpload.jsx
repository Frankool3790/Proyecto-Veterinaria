import { useState } from 'react';
import api from '../../services/api';
import toast from 'react-hot-toast';
import { Upload, X } from 'lucide-react';
import { getAssetUrl } from '../../utils/apiConfig';
import './ImageUpload.css';

export default function ImageUpload({ onUploadSuccess, currentImage, label = "Imagen" }) {
  const [uploading, setUploading] = useState(false);
  const [preview, setPreview] = useState(null);

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Preview
    const reader = new FileReader();
    reader.onloadend = () => setPreview(reader.result);
    reader.readAsDataURL(file);

    // Upload
    const formData = new FormData();
    formData.append('image', file);

    try {
      setUploading(true);
      const response = await api.post('/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      onUploadSuccess(response.data.imageUrl);
      toast.success('Imagen subida correctamente');
    } catch (error) {
      console.error('Error uploading image:', error);
      toast.error('Error al subir la imagen');
    } finally {
      setUploading(false);
    }
  };

  const removeImage = () => {
    setPreview(null);
    onUploadSuccess(null);
  };

  const displayImage = preview || (currentImage ? getAssetUrl(currentImage) : null);

  return (
    <div className="image-upload-container">
      <label className="image-upload-label">{label}</label>
      <div className="image-upload-box">
        {displayImage ? (
          <div className="image-preview-wrapper">
            <img src={displayImage} alt="Preview" className="image-preview" />
            <button type="button" className="remove-image-btn" onClick={removeImage}>
              <X size={16} />
            </button>
          </div>
        ) : (
          <label className="upload-placeholder">
            <input type="file" accept="image/*" onChange={handleFileChange} hidden disabled={uploading} />
            {uploading ? (
              <div className="uploading-spinner">Cargando...</div>
            ) : (
              <>
                <Upload size={24} />
                <span>Subir imagen</span>
              </>
            )}
          </label>
        )}
      </div>
    </div>
  );
}
