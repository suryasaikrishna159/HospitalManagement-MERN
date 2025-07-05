import React, { useState } from "react";
import axios from "axios";

function Addnewdoctor() {
  let [id, setid] = useState();
  let [name, setname] = useState("");
  let [specialization, setSpecialization] = useState("");
  let [email, setEmail] = useState("");

  const adddoctor = async () => {
    try {
      await axios.post("http://localhost:5000/api/v1/doctors", {id,name:`Dr. ${name}`,specialization,email});
      alert("Doctor added successfully!");
      setid(0);
      setname("");
      setSpecialization("");
      setEmail("");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="doctorform">
      <label>Id:</label>
      <input
        type="number"
        placeholder="Enter ID of doctor"
        value={id}
        onChange={(e) => setid(Number(e.target.value))}
      />

      <label>Name:</label>
      <input
        placeholder="Enter name of doctor"
        value={name}
        onChange={(e) => setname(e.target.value)}
      />

      <label>Specialization:</label>
      <input
        placeholder="Enter specialization"
        value={specialization}
        onChange={(e) => setSpecialization(e.target.value)}
      />

      <label>Email:</label>
      <input
        placeholder="Enter email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <button onClick={adddoctor}>Add</button>
    </div>
  );
}

export default Addnewdoctor;
