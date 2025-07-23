import React, { useState } from 'react';
import axios from 'axios';

const PatientHistory = () => {
  const [patientID, setPatientID] = useState('');
  const [history, setHistory] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchHistory = async () => {
    if (!patientID) {
      alert('Please enter a Patient ID.');
      return;
    }
    setLoading(true);
    try {
      const res = await axios.get(`http://localhost:3000/patientHistory/${patientID}`);
      setHistory(res.data);
    } catch (error) {
      alert(`❌ Error: ${error.response?.data?.error || error.message}`);
      setHistory(null);
    }
    setLoading(false);
  };

  return (
    <div>
      <h2>Patient History</h2>
      <input
        placeholder="Patient ID"
        value={patientID}
        onChange={(e) => setPatientID(e.target.value)}
      />
      <button onClick={fetchHistory} disabled={loading}>
        {loading ? 'Loading...' : 'View History'}
      </button>
      {history && <pre>{JSON.stringify(history, null, 2)}</pre>}
    </div>
  );
};

export default PatientHistory;