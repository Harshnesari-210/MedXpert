import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function PrescriptionDetails() {
  const { patientId } = useParams();
  const [prescriptions, setPrescriptions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPrescriptions = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/prescriptions/${patientId}`, {
          withCredentials: true,
        });
        setPrescriptions(response.data);
      } catch (error) {
        console.error("Error fetching prescriptions:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPrescriptions();
  }, [patientId]);

  if (loading) return <p className="p-4 text-center">Loading prescriptions...</p>;
  if (prescriptions.length === 0) return <p className="p-4 text-center">No prescriptions found for this appointment.</p>;

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-2xl font-semibold mb-6 text-blue-700 text-center">Prescription Details</h2>
      {prescriptions.map((presc, index) => (
        <div key={index} className="bg-white border rounded-xl p-6 mb-6 shadow">
          <p className="mb-2"><strong>Doctor:</strong> {presc.doctorId.firstName} {presc.doctorId.lastName}</p>
          <p className="mb-2"><strong>Email:</strong> {presc.doctorId.email}</p>
          <p className="mb-4"><strong>Date:</strong> {new Date(presc.createdAt).toLocaleDateString()}</p>

          <h3 className="font-semibold mb-2">Medicines:</h3>
          <ul className="list-disc list-inside mb-4">
            {presc.medicines.map((med, i) => (
              <li key={i} className="mb-1">
                <strong>{med.name}</strong> - {med.quantity}
                {med.instructions && <> ({med.instructions})</>}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

export default PrescriptionDetails;
