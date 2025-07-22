import React, { useState } from 'react';
import axios from 'axios';

const ViewPatient = () => {
  const [patientID, setPatientID] = useState('');
  const [patient, setPatient] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchPatient = async () => {
    if (!patientID) {
      alert('Please enter a Patient ID.');
      return;
    }
    setLoading(true);
    try {
      const res = await axios.get(`http://localhost:3000/patient/${patientID}`);
      setPatient(res.data);
    } catch (error) {
      alert(`❌ Error: ${error.response?.data?.error || error.message}`);
      setPatient(null);
    }
    setLoading(false);
  };

  return (
    <div>
      <h2>View Patient</h2>
      <input
        placeholder="Patient ID"
        value={patientID}
        onChange={(e) => setPatientID(e.target.value)}
      />
      <button onClick={fetchPatient} disabled={loading}>
        {loading ? 'Loading...' : 'View'}
      </button>
      {patient && <pre>{JSON.stringify(patient, null, 2)}</pre>}
    </div>
  );
};

export default ViewPatient;