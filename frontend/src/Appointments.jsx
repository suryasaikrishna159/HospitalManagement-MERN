import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function Appointments() {
  const [allAppointments, setAllAppointments] = useState([]);
  const [filteredAppointments, setFilteredAppointments] = useState([]);
  const [searchPatient, setSearchPatient] = useState('');
  const [searchDoctor, setSearchDoctor] = useState(''); 

  const fetchAppointments = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/v1/appointments');
      const data = res.data.appointmentsdata;
      setAllAppointments(data);
      setFilteredAppointments(data); 
    } catch (err) {
      console.log(err);
    }
  };

  const deletion = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/v1/appointments/${id}`);
      fetchAppointments();
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  
  useEffect(() => {
    const filtered = allAppointments.filter(x =>
      x.patient_name.toLowerCase().includes(searchPatient.toLowerCase()) &&
      x.doctor_name.toLowerCase().includes(searchDoctor.toLowerCase())
    );
    setFilteredAppointments(filtered);
  }, [searchPatient, searchDoctor, allAppointments]);

  return (
    <div className="body">
      <div className="main">
         <Link className="adddoc" to="/Addnewappointment">Book Appointment</Link> 
        <h1>Appointments</h1>

        <div className="doctorform">
          <input
            type="text"
            placeholder="Search by Patient Name"
            value={searchPatient}
            onChange={(e) => setSearchPatient(e.target.value)}
          />
          <input
            type="text"
            placeholder="Search by Doctor Name"
            value={searchDoctor}
            onChange={(e) => setSearchDoctor(e.target.value)}
          />
        </div>

        
        <div className="appointments_container">
          <div className="heading">
            <h6 className="column">ID</h6>
            <h6 className="column">Patient</h6>
            <h6 className="column">Doctor</h6>
            <h6 className="column">Status</h6>
            <h6 className="column">Date</h6>
            <h6 className="column">Action</h6>
          </div>

          {filteredAppointments.length > 0 ? (
            <ul>
              {filteredAppointments.map(x => (
                <li key={x.id}>
                  <div className="column">{x.id}</div>
                  <div className="column">{x.patient_name}</div>
                  <div className="column">{x.doctor_name}</div>
                  <div className="column">{x.status}</div>
                  <div className="column">
                    {new Date(x.date).toLocaleDateString("en-GB")}
                  </div>
                  <div><button className="delete" onClick={() => deletion(x.id)}>delete</button></div>
                </li>
              ))}
            </ul>
          ) : (
            <p>No appointments </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Appointments;
