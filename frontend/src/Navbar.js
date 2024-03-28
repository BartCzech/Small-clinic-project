import React from "react";
import { Link } from "react-router-dom";
import "./navbar.css"; 

const Navbar = () => {
  const apiUrl = process.env.API_URL;

  return (
    <nav className="navbar">
      <ul className="nav-list">
        <li className="nav-item">
          <Link to="/list" className="nav-link">List Patients</Link>
        </li>
        <li className="nav-item">
          <Link to="/create" className="nav-link">{apiUrl}</Link>
        </li>
        
        <li className="nav-item">
          <Link to="/create" className="nav-link">Create Patient</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;