import React, { useEffect, useState } from "react";
 import axios from "axios";

function Addnewappointment(){

    let [id,setid]=useState();
    let [patient_name,setpatname]=useState("");
    let [doctor_name,setdocname]=useState("");
    let [status,setstatus]=useState("");
    let [date,setdate]=useState();

    let [doctors,setdoctors]=useState([]);
    let [patients,setpatients]=useState([]);


    const getdoctorsdata=async()=>{
        try{
            const res=await axios.get("http://localhost:5000/api/v1/doctors");
            const doctorsdata=res.data.doctorsdata;
            setdoctors(doctorsdata);
        }
        catch(err){
            console.log(err);
        }
    }

    const getpatientsdata=async()=>{
        try{
            const res=await axios.get("http://localhost:5000/api/v1/patients");
            const patientsdata=res.data.patientdata;
            setpatients(patientsdata);
        }
        catch(err){
            console.log(err);
        }

    }

    const bookappointment=async()=>{
        try{
            await axios.post("http://localhost:5000/api/v1/appointments",{id,date,patient_name,doctor_name,status});
            alert("appointment booked successfully");
            setid("");
            setpatname("");
            setdocname("");
            setstatus("");
            setdate("");
        }
        catch(err){
            console.log(err);
        }
    }

    useEffect(()=>{
        getdoctorsdata();
        getpatientsdata();
    },[]);

    return(
    <div className="doctorform">
        <label>Id:</label>
        <input
            type="number"
            placeholder="Enter AppointmentID"
            value={id}
            onChange={(e)=>setid(Number(e.target.value))}
        />

        <label>Doctor Name:</label>

        <select onChange={(e) => setdocname(e.target.value)} value={doctor_name}>
            <option value="">Select Doctor</option>
            {doctors.map((x, index) => (
                <option key={index} value={x.name}>{x.name}</option>
            ))}
        </select>

        {/* <input
            placeholder="Enter name of doctor"
            value={doctor_name}
            onChange={(e)=>setdocname(e.target.value)}
        /> */}

        <label>Patient Name:</label>
        <select onChange={(e) => setpatname(e.target.value)} value={patient_name}>
            <option value="">Select Patient</option>
            {patients.map((x, index) => (
                <option key={index} value={x.name}>{x.name}</option>
            ))}
        </select>

        {/* <input
            placeholder="Enter Patient Name"
            value={patient_name}
            onChange={(e)=>setpatname(e.target.value)}
        /> */}

        <label>Status:</label>
        <input
            placeholder="Enter Status of Appointment"
            value={status}
            onChange={(e)=>setstatus(e.target.value)}
        />

        <label>Date:</label>
        <input
            type="date"
            placeholder="Enter Date of Appointment"
            value={date}
            onChange={(e)=>setdate((e.target.value))}
        />

        <button onClick={bookappointment}>Book Appointment</button>
    </div>
    )
}
export default Addnewappointment;