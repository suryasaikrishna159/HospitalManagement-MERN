import React, { useState } from "react";
import axios from "axios";

function Addnewpatient() {
  let [id, setid] = useState();
  let [name, setname] = useState("");
  let [disease, setdisease] = useState("");
  let [email, setEmail] = useState("");

  const adddoctor = async () => {
    try {
      await axios.post("https://hospitalmanagement-mern.onrender.com/api/v1/patients", {id,name,disease,email});
      alert("patient added successfully!");
      setid(0);
      setname("");
      setdisease("");
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
        placeholder="Enter ID of Patient"
        value={id}
        onChange={(e) => setid(Number(e.target.value))}
      />

      <label>Name:</label>
      <input
        placeholder="Enter name of Patient"
        value={name}
        onChange={(e) => setname(e.target.value)}
      />

      <label>Disease:</label>
      <input
        placeholder="Enter Disease"
        value={disease}
        onChange={(e) => setdisease(e.target.value)}
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

export default Addnewpatient;
