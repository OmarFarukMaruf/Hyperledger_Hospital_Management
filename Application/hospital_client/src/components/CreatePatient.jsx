import React, { useState } from 'react';
import axios from 'axios';

const CreatePatient = () => {
  const [formData, setFormData] = useState({ PatientID:'', Name:'', Age:'', Gender:'', Diagnosis:'', Doctor:'', AdmissionDate:'' });

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async () => {
    try {
      await axios.post('http://localhost:3000/createPatient', formData);
      alert('✅ Patient Created!');
    } catch (error) {
      alert(`❌ Error: ${error.response.data.error}`);
    }
  };

  return (
    <div>
      <h2>Create Patient</h2>
      <input name="PatientID" placeholder="Patient ID" onChange={handleChange} /><br/>
      <input name="Name" placeholder="Name" onChange={handleChange} /><br/>
      <input name="Age" placeholder="Age" onChange={handleChange} /><br/>
      <input name="Gender" placeholder="Gender" onChange={handleChange} /><br/>
      <input name="Diagnosis" placeholder="Diagnosis" onChange={handleChange} /><br/>
      <input name="Doctor" placeholder="Doctor" onChange={handleChange} /><br/>
      <input name="AdmissionDate" placeholder="Admission Date" onChange={handleChange} /><br/>
      <button onClick={handleSubmit}>Create Patient</button>
    </div>
  );
};

export default CreatePatient;