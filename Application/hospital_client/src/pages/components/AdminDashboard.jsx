import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './AdminDashboard.css';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [patients, setPatients] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const patientsPerPage = 10;

  const fetchPatients = async () => {
    try {
      const res = await axios.get('http://localhost:8080/api/patients');
      setPatients(res.data);
    } catch (error) {
      console.error('Error fetching patients:', error);
    }
  };

  useEffect(() => {
    fetchPatients();
  }, []);

  const indexOfLastPatient = currentPage * patientsPerPage;
  const indexOfFirstPatient = indexOfLastPatient - patientsPerPage;
  const currentPatients = patients.slice(indexOfFirstPatient, indexOfLastPatient);

  const nextPage = () => {
    if (indexOfLastPatient < patients.length) {
      setCurrentPage(prev => prev + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(prev => prev - 1);
    }
  };

  const handleCreatePatient = () => {
    navigate('/create-patient');
  };

  return (
    <div className="dashboard-container">
      <aside className="sidebar">
        <h2 className="sidebar-title">HospitalMS</h2>
        <nav className="sidebar-menu">
          <span>Dashboard</span><br />
          <span>Patient Records</span><br />
          <span>Manage Patients</span><br />
          <span>Appointments</span><br />
          <span>Reports</span>
        </nav>
      </aside>

      <main className="main-content">
        <header className="dashboard-header">
          <input type="text" placeholder="Search patients..." className="search-box" />
          <span className="user-info">admin@hospital.com</span>
        </header>

        <section className="dashboard-cards">
          <div className="card card-purple">
            <h3>12</h3>
            <p>New Registrations</p>
          </div>
          <div className="card card-green">
            <h3>48</h3>
            <p>Patients Admitted</p>
          </div>
          <div className="card card-orange">
            <h3>30</h3>
            <p>Patients Released</p>
          </div>
          <div className="card card-blue">
            <h3>{patients.length}</h3>
            <p>Total Patients</p>
          </div>
        </section>

        <div className="create-patient-button-container">
          <button className="create-patient-button" onClick={handleCreatePatient}>
            + Create Patient
          </button>
        </div>

        <section className="patient-table-section">
          <h2>Patient List</h2>
          <table className="patient-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Address</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentPatients.map((patient, index) => (
                <tr key={index}>
                  <td>{patient.firstName} {patient.lastName}</td>
                  <td>{patient.email}</td>
                  <td>{patient.phone}</td>
                  <td>
                    {patient.addressLine1}, {patient.city}, {patient.region}, {patient.country}
                  </td>
                  <td>
                    <button className="edit-btn">Edit</button>
                    <button className="delete-btn">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="pagination">
            <button onClick={prevPage} disabled={currentPage === 1}>Previous</button>
            <button onClick={nextPage} disabled={indexOfLastPatient >= patients.length}>Next</button>
          </div>
        </section>
      </main>
    </div>
  );
};

export default AdminDashboard;