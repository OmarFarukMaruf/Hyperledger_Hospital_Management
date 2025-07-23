import React, { useState } from 'react';
import axios from 'axios';

const UpdatePatient = () => {
  const [patientID, setPatientID] = useState('');
  const [formData, setFormData] = useState({
    Name: '',
    Age: '',
    Gender: '',
    Diagnosis: '',
    Doctor: '',
    AdmissionDate: ''
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleUpdate = async () => {
    if (!patientID) {
      alert('Please enter a Patient ID.');
      return;
    }
    setLoading(true);
    try {
      await axios.put(`http://localhost:3000/updatePatient/${patientID}`, formData);
      alert('Patient Updated!');
      setFormData({
        Name: '',
        Age: '',
        Gender: '',
        Diagnosis: '',
        Doctor: '',
        AdmissionDate: ''
      });
      setPatientID('');
    } catch (error) {
      alert(`❌ Error: ${error.response?.data?.error || error.message}`);
    }
    setLoading(false);
  };
  return (
    <div>
      <h2>Update Patient</h2>
      <input
        placeholder="Patient ID"
        value={patientID}
        onChange={(e) => setPatientID(e.target.value)}
      /><br />
      <input name="Name" placeholder="Name" value={formData.Name} onChange={handleChange} /><br />
      <input name="Age" placeholder="Age" value={formData.Age} onChange={handleChange} /><br />
      <input name="Gender" placeholder="Gender" value={formData.Gender} onChange={handleChange} /><br />
      <input name="Diagnosis" placeholder="Diagnosis" value={formData.Diagnosis} onChange={handleChange} /><br />
      <input name="Doctor" placeholder="Doctor" value={formData.Doctor} onChange={handleChange} /><br />
      <input name="AdmissionDate" placeholder="Admission Date" value={formData.AdmissionDate} onChange={handleChange} /><br />
      <button onClick={handleUpdate} disabled={loading}>
        {loading ? 'Updating...' : 'Update Patient'}
      </button>
    </div>
  );
};

export default UpdatePatient;