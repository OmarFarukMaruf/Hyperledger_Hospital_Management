import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AdminLogin from "./pages/login/AdminLogin";
import AdminDashboard from "./pages/components/AdminDashboard";
import CreatePatient from "./pages/components/CreatePatient";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AdminLogin />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/create-patient" element={<CreatePatient />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;