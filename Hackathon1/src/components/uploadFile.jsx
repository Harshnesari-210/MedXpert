import React, { useState } from 'react';
import axios from 'axios';

function MedicalFileUpload() {
  const [file, setFile] = useState(null);
  const [fileType, setFileType] = useState('');
  const [description, setDescription] = useState('');
  const [uploading, setUploading] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);

    if (selectedFile) {
      const type = selectedFile.type;
      if (type.includes("pdf")) {
        setFileType("PDF");
      } else if (type.includes("image")) {
        setFileType("Image");
      } else {
        setFileType("Other");
      }
    }
  };

  const handleUpload = async (e) => {
    e.preventDefault();

    if (!file) {
      alert("Please select a file");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("description", description);
    formData.append("fileType", fileType);

    try {
      setUploading(true);
      const response = await axios.post('http://localhost:3000/medical-files/upload', formData, {
        headers: {
          "Content-Type": "multipart/form-data"
        },
        withCredentials: true, // if using cookies/session
      });

      setSuccessMsg("File uploaded successfully!");
      setFile(null);
      setDescription('');
    } catch (error) {
      console.error("Upload failed:", error);
      alert("Upload failed.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-8 p-6 border shadow rounded bg-white">
      <h2 className="text-xl font-semibold mb-4">Upload Medical File</h2>

      <form onSubmit={handleUpload}>
        <input
          type="file"
          onChange={handleFileChange}
          className="block mb-4"
          accept=".pdf,image/*"
        />

        <textarea
          placeholder="Add description (optional)"
          className="w-full p-2 border rounded mb-4"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          disabled={uploading}
        >
          {uploading ? "Uploading..." : "Upload File"}
        </button>
      </form>

      {successMsg && (
        <p className="mt-4 text-green-600 font-medium">{successMsg}</p>
      )}
    </div>
  );
}

export default MedicalFileUpload;
