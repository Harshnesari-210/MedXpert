import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function PatientDetail() {
  const { patientId } = useParams();
  const [patient, setPatient] = useState(null);
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPatientDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/patient/${patientId}`, {
          withCredentials: true,
        });
        setPatient(response.data);
      } catch (error) {
        console.error("Error fetching patient details:", error);
      }
    };

    const fetchPatientFiles = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/medical-files/${patientId}`, {
          withCredentials: true,
        });
        setFiles(response.data);
      } catch (error) {
        console.error("Error fetching patient files:", error);
      }
    };

    // Fetch both details and files in parallel
    Promise.all([fetchPatientDetails(), fetchPatientFiles()])
      .finally(() => setLoading(false));
  }, [patientId]);

  if (loading) {
    return <p>Loading patient details...</p>;
  }

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">Patient Details</h2>

      {patient ? (
        <div>
          <p><strong>Name:</strong> {patient.firstName} {patient.lastName}</p>
          <p><strong>Email:</strong> {patient.email}</p>

          <h3 className="text-lg font-semibold mt-4">Medical Files</h3>
          {files.length > 0 ? (
            <ul className="space-y-4">
              {files.map((file) => (
                <li key={file._id} className="border p-4 rounded shadow">
                  <p><strong>File Name:</strong> {file.fileName}</p>
                  <p><strong>Description:</strong> {file.description}</p>
                  <a
                    href={`http://localhost:3000${file.fileUrl}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 underline"
                  >
                    View File
                  </a>
                </li>
              ))}
            </ul>
          ) : (
            <p>No medical files available.</p>
          )}
        </div>
      ) : (
        <p>Patient not found.</p>
      )}
    </div>
  );
}

export default PatientDetail;
