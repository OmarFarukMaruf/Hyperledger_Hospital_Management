import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './CreatePatient.css';

const CreatePatient = () => {
  const navigate = useNavigate();
  const [patient, setPatient] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    addressLine1: '',
    addressLine2: '',
    city: '',
    region: '',
    postalCode: '',
    country: ''
  });

  const handleChange = (e) => {
    setPatient({ ...patient, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post('http://localhost:8080/api/patients/create', patient);
    alert("Patient successfully created!");
    navigate('/admin');
  };

  return (
    <div className="patient-form-container">
      <h2>Create Patient Form</h2>
      <p>Please fill all required fields to register the patient.</p>

      <form onSubmit={handleSubmit} className="patient-form">
        <label>Full Name</label>
        <div className="name-group">
          <input name="firstName" placeholder="First" required onChange={handleChange} />
          <input name="lastName" placeholder="Last" required onChange={handleChange} />
        </div>

        <label>Email</label>
        <input name="email" type="email" placeholder="john@company.com" required onChange={handleChange} />

        <label>Phone Number</label>
        <input name="phone" placeholder="+49 324 423 234" required onChange={handleChange} />

        <label>Address</label>
        <input name="addressLine1" placeholder="Address line 1" required onChange={handleChange} />
        <input name="addressLine2" placeholder="Address line 2" onChange={handleChange} />

        <div className="address-group">
          <input name="city" placeholder="City" required onChange={handleChange} />
          <input name="region" placeholder="Region" required onChange={handleChange} />
        </div>

        <div className="address-group">
          <input name="postalCode" placeholder="Postal / Zip Code" required onChange={handleChange} />
          <select name="country" required onChange={handleChange}>
            <option>United States</option>
            <option>Germany</option>
            <option>Canada</option>
            <option>India</option>
          </select>
        </div>

        <button type="submit" className="submit-btn">Create Patient</button>
      </form>
    </div>
  );
};

export default CreatePatient;