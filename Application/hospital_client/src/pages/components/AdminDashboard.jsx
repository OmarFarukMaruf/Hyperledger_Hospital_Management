import React from 'react';
import './AdminDashboard.css';

const AdminDashboard = () => {
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
            <h3>90</h3>
            <p>Total Patients</p>
          </div>
        </section>

        <div className="create-patient-button-container">
          <button className="create-patient-button">+ Create Patient</button>
        </div>

        <section className="patient-table-section">
          <h2>Patient List</h2>
          <table className="patient-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Age</th>
                <th>Gender</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>John Doe</td>
                <td>45</td>
                <td>Male</td>
                <td>Admitted</td>
                <td>
                  <button className="edit-btn">Edit</button>
                  <button className="delete-btn">Delete</button>
                </td>
              </tr>
              <tr>
                <td>Jane Smith</td>
                <td>32</td>
                <td>Female</td>
                <td>Released</td>
                <td>
                  <button className="edit-btn">Edit</button>
                  <button className="delete-btn">Delete</button>
                </td>
              </tr>
            </tbody>
          </table>
        </section>
      </main>
    </div>
  );
};

export default AdminDashboard;