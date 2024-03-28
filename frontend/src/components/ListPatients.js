import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./styles.css";

const ListPatients = () => {
  const [patients, setPatients] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const apiKey = process.env.REACT_APP_API_URL;

  const getData = async () => {
    try {
      console.log(apiKey);
      const response = await axios.get(
        `${apiKey}/patients/patients?search=${searchTerm}`
      );
      setPatients(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    getData();
  }, [searchTerm]);

  const handleDelete = async (patientId, patientName, patientSurname) => {
    const confirmDelete = window.confirm(
      `Are you sure you want to delete ${patientName} ${patientSurname}?`
    );
    if (confirmDelete) {
      try {
        await axios.post(`${apiKey}/patients/patient/delete`, {
          patient_id: patientId,
        });
        getData(); // Refresh patient list after deletion
        alert("Patient successfully deleted!");
      } catch (error) {
        console.error("Error deleting patient:", error);
      }
    }
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <div>
      <h2>List of Patients</h2>
      <h4>In the box below you can search patients by name, surname, city, street, PESEL number, phone number or health issue.</h4>
      <input
        type="text"
        placeholder="Search..."
        value={searchTerm}
        onChange={handleSearch}
      />
      <table style={styles.table}>
        <thead>
          <tr>
            <th style={styles.cell}>Name</th>
            <th style={styles.cell}>Surname</th>
            <th style={styles.cell}>PESEL</th>
            <th style={styles.cell}>City</th>
            <th style={styles.cell}>Street</th>
            <th style={styles.cell}>House Number</th>
            <th style={styles.cell}>Flat Number</th>
            <th style={styles.cell}>Zipcode</th>
            <th style={styles.cell}>Phone Number</th>
            <th style={styles.cell}>Health issue</th>
            <th style={styles.cell}>Deleting patient</th>
            <th style={styles.cell}>Updating patient</th>
          </tr>
        </thead>
        <tbody>
          {patients.map((patient) => (
            <tr key={patient._id}>
              <td style={styles.cell}>{patient.name}</td>
              <td style={styles.cell}>{patient.surname}</td>
              <td style={styles.cell}>{patient.pesel}</td>
              <td style={styles.cell}>{patient.city}</td>
              <td style={styles.cell}>{patient.street}</td>
              <td style={styles.cell}>{patient.house_number}</td>
              <td style={styles.cell}>{patient.flat_number}</td>
              <td style={styles.cell}>{patient.zipcode}</td>
              <td style={styles.cell}>{patient.phone_number}</td>
              <td style={styles.cell}>{patient.health_issue}</td>
              <td>
                <button
                  onClick={() =>
                    handleDelete(patient._id, patient.name, patient.surname)
                  }
                >
                  Delete
                </button>
              </td>
              <td>
                <Link
                  to={{
                    pathname: `/update/${patient._id}`,
                    state: { patient },
                  }}
                >
                  Update
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const styles = {
  table: {
    borderCollapse: "collapse",
    width: "100%",
  },
  cell: {
    border: "1px solid #ddd",
    padding: "8px",
    textAlign: "left",
  },
};

export default ListPatients;
