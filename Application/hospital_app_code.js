// Complete Project Code Structure

// Client (Frontend - Vite React App)

// client/src/App.jsx
import React from 'react';
import CreatePatient from './components/CreatePatient';
import ViewPatient from './components/ViewPatient';
import UpdatePatient from './components/UpdatePatient';
import DeletePatient from './components/DeletePatient';
import PatientHistory from './components/PatientHistory';

function App() {
  return (
    <div className="App">
      <h1>🏥 Hospital Management Blockchain UI</h1>
      <CreatePatient />
      <ViewPatient />
      <UpdatePatient />
      <DeletePatient />
      <PatientHistory />
    </div>
  );
}

export default App;

// client/src/components/CreatePatient.jsx
import React, { useState } from 'react';
import axios from 'axios';

export default function CreatePatient() {
  const [formData, setFormData] = useState({ PatientID:'', Name:'', Age:'', Gender:'', Diagnosis:'', Doctor:'', AdmissionDate:'' });

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async () => {
    await axios.post('http://localhost:3000/createPatient', formData);
    alert('Patient Created!');
  };

  return (
    <div>
      <input name="PatientID" placeholder="Patient ID" onChange={handleChange} />
      <input name="Name" placeholder="Name" onChange={handleChange} />
      <input name="Age" placeholder="Age" onChange={handleChange} />
      <input name="Gender" placeholder="Gender" onChange={handleChange} />
      <input name="Diagnosis" placeholder="Diagnosis" onChange={handleChange} />
      <input name="Doctor" placeholder="Doctor" onChange={handleChange} />
      <input name="AdmissionDate" placeholder="Admission Date" onChange={handleChange} />
      <button onClick={handleSubmit}>Create Patient</button>
    </div>
  );
}

// client/src/components/ViewPatient.jsx
import React, { useState } from 'react';
import axios from 'axios';

export default function ViewPatient() {
  const [patient, setPatient] = useState(null);
  const fetchPatient = async (id) => {
    const res = await axios.get(`http://localhost:3000/patient/${id}`);
    setPatient(res.data);
  };

  return (
    <div>
      <input placeholder="Patient ID" onChange={(e)=>fetchPatient(e.target.value)} />
      {patient && <pre>{JSON.stringify(patient)}</pre>}
    </div>
  );
}

// (Similarly create UpdatePatient.jsx, DeletePatient.jsx, PatientHistory.jsx)

// Server (Backend - Express & Fabric SDK)

// server/index.js
const express = require('express');
const cors = require('cors');
const { Gateway, Wallets } = require('fabric-network');
const path = require('path');
const fs = require('fs');

const app = express();
app.use(express.json());
app.use(cors());

async function getContract() {
  const ccpPath = path.resolve(__dirname, 'connection-org1.json');
  const ccp = JSON.parse(fs.readFileSync(ccpPath));

  const walletPath = path.join(__dirname, 'wallet');
  const wallet = await Wallets.newFileSystemWallet(walletPath);
  const gateway = new Gateway();

  await gateway.connect(ccp, { wallet, identity: 'admin', discovery: { enabled: true, asLocalhost: true } });
  const network = await gateway.getNetwork('channelHospital');
  return network.getContract('hospital');
}

app.post('/createPatient', async (req, res) => {
  const contract = await getContract();
  await contract.submitTransaction('CreatePatientRecord', ...Object.values(req.body));
  res.send('Patient Created');
});

app.get('/patient/:id', async (req, res) => {
  const contract = await getContract();
  const result = await contract.evaluateTransaction('ReadPatientRecord', req.params.id);
  res.json(JSON.parse(result));
});

// (similarly implement update, delete, and history routes)

app.listen(3000, () => console.log('Server running on port 3000'));
