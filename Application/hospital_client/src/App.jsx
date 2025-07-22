import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import CreatePatient from './components/CreatePatient.jsx';
import ViewPatient from './components/ViewPatient.jsx';
import UpdatePatient from './components/UpdatePatient.jsx';
import DeletePatient from './components/DeletePatient.jsx';
import PatientHistory from './components/PatientHistory.jsx';

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
