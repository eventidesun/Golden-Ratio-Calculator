import React, { useState } from 'react';

const ImageUpload = ({onImageUpload}) => {
    const [preview, setPreview] = useState(null);

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const url = URL.createObjectURL(file);
            setPreview(url);
            onImageUpload(file);
        }
    }

    return (
        <div className="upload-container">
            <input type="file" accept="image/*" onChange={handleImageChange}/>
            {preview && <img src={preview} alt="Preview" className="preview-image"/>}
        </div>
    );
};

export default ImageUpload;
