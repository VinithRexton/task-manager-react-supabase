function ImageUploader({ value, onChange }) {
    const handleUpload = (event) => {
      const file = event.target.files[0];
  
      if (!file) return;
  
      onChange(file);
    };
  
    const preview =
      value instanceof File
        ? URL.createObjectURL(value)
        : value;
  
    return (
      <div className="image-uploader">
        <label className="upload-box">
          <input
            type="file"
            accept="image/*"
            onChange={handleUpload}
          />
  
          {value ? "Change Image" : "Upload Image"}
        </label>
  
        {preview && (
          <img
            src={preview}
            alt="Preview"
            className="preview"
          />
        )}
      </div>
    );
  }
  
  export default ImageUploader;