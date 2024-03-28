import React from "react";
import { BrowserRouter as Router, Route, Routes  } from "react-router-dom";
import Navbar from "./Navbar";
import ListPatients from "./components/ListPatients";
import CreatePatient from "./components/CreatePatient";
import UpdatePatient from "./components/UpdatePatient";
import "./App.css";

const App = () => {
  
  return (
    <Router>
      <div>
        <Navbar />
        <Routes >
          <Route path="/list" element={<ListPatients />} />
          <Route path="/create" element={<CreatePatient />} />
          <Route path="/update/:id" element={<UpdatePatient />} />
        </Routes >
      </div>
    </Router>
  );
};

export default App;