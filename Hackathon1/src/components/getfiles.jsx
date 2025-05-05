import React, { useEffect, useState } from 'react';
import axios from 'axios';

const MedicalFiles = () => {
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch the medical files from the server
  useEffect(() => {
    axios
    .get('http://localhost:3000/all-files')
    .then((response) => {
        setFiles(response.data.files); // Store files in state
        setLoading(false); // Set loading to false after data is fetched
      })
      .catch((err) => {
        setError('Error fetching files'); // Handle errors
        setLoading(false); // Stop loading
      });
  }, []);

  if (loading) {
    return <p className="text-center text-lg">Loading files...</p>;
  }

  if (error) {
    return <p className="text-center text-lg text-red-500">{error}</p>;
  }

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-2xl font-semibold text-center mb-6">Medical Files</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {files.length === 0 ? (
          <p className="text-center col-span-full text-lg">No files uploaded yet.</p>
        ) : (
          files.map((file) => (
            <div key={file._id} className="bg-white p-4 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold mb-2">{file.fileName}</h3>
              <p className="text-gray-700 mb-2">
                <strong>Uploaded By:</strong> {file.patientId.firstName} {file.patientId.lastName}
              </p>
              <p className="text-gray-600 mb-2">
                <strong>Description:</strong> {file.description || 'No description available'}
              </p>
              <p className="text-gray-500 mb-4">
                <strong>Type:</strong> {file.fileType}
              </p>
              <a
  href={`http://localhost:3000${file.fileUrl}`} // Change this to match your server URL
  target="_blank"
  rel="noopener noreferrer"
  className="text-blue-500 hover:underline"
>
  View File
</a>

                
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default MedicalFiles;
