import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import AdminLogin from './pages/login/AdminLogin.jsx';
import AdminDashboard from './pages/components/AdminDashboard.jsx';

import CreatePatient from './pages/components/CreatePatient.jsx';
import UpdatePatient from './pages/components/UpdatePatient.jsx';
import DeletePatient from './pages/components/DeletePatient.jsx';
import ViewPatient from './pages/components/ViewPatient.jsx';
import PatientHistory from './pages/components/PatientHistory.jsx';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AdminLogin />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/create" element={<CreatePatient />} />
        <Route path="/update" element={<UpdatePatient />} />
        <Route path="/delete" element={<DeletePatient />} />
        <Route path="/view" element={<ViewPatient />} />
        <Route path="/history" element={<PatientHistory />} />
      </Routes>
    </Router>
  );
}

export default App;
