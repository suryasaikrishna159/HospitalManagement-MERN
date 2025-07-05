import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Hospmanagesys from "./Hospmanagesys.jsx";
import Doctors from "./Doctors.jsx";
import Patients from "./Patients.jsx";
import Appointments from "./Appointments.jsx";
import Addnewdoctor from "./Addnewdoctor.jsx";
import Addnewpatient from "./Addnewpatient.jsx";
import Addnewappointment from "./Addnewappointment.jsx";
import Navbar from './Navbar';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Hospmanagesys />} />
        <Route path="/doctors" element={<Doctors />} />
        <Route path="/patients" element={<Patients />} />
        <Route path="/appointments" element={<Appointments />} />
        <Route path="/Addnewdoctor" element={<Addnewdoctor/>}/>
        <Route path="/Addnewpatient" element={<Addnewpatient/>}/>
        <Route path="/Addnewappointment" element={<Addnewappointment/>}/>
      </Routes>
    </Router>
  );
}

export default App;
