import React, { useState } from 'react';
import axios from 'axios';

const DeletePatient = () => {
  const [patientID, setPatientID] = useState('');
  const [loading, setLoading] = useState(false);

  const deletePatient = async () => {
    if (!patientID) {
      alert('Please enter a Patient ID.');
      return;
    }
    setLoading(true);
    try {
      await axios.delete(`http://localhost:3000/deletePatient/${patientID}`);
      alert('Patient Deleted!');
      setPatientID('');
    } catch (error) {
      alert(`❌ Error: ${error.response?.data?.error || error.message}`);
    }
    setLoading(false);
  };

  return (
    <div>
      <h2>Delete Patient</h2>
      <input
        placeholder="Patient ID"
        value={patientID}
        onChange={(e) => setPatientID(e.target.value)}
      />
      <button onClick={deletePatient} disabled={loading}>
        {loading ? 'Deleting...' : 'Delete Patient'}
      </button>
    </div>
  );
};

export default DeletePatient;