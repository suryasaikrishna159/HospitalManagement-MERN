import React, { useEffect, useState } from 'react';
import axios from "axios";
import { Link } from 'react-router-dom';

function Patients() {
  const [allDoctors, setAllDoctors] = useState([]);
  const [docslist, setdocslist] = useState([]);
  const [searchval, setsearchval] = useState("");
  const [loading, setLoading] = useState(true);

  const totaldocs = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/v1/patients");
      setAllDoctors(res.data.patientdata);
      setdocslist(res.data.patientdata);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    totaldocs();
  }, []);

  const deletion = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/v1/patients/${id}`);
      totaldocs();
    } catch (err) {
      console.log(err);
    }
  };

  const search = (e) => {
    const keyword = e.target.value.toLowerCase();
    setsearchval(keyword);
    const filtered = allDoctors.filter(doc => doc.name.toLowerCase().includes(keyword));
    setdocslist(filtered);
  };

  return (
    <div className="body">
      <div className="main">
        <Link className='adddoc' to="/Addnewpatient">Add New Patient</Link>
        <h1>Patients</h1>
        <input
          type="text"
          value={searchval}
          onChange={search}
          placeholder="Search Patient"
          className="search"
        />

        <div className="doctors_container">
          <div className="heading row">
            <div className="column">ID</div>
            <div className="column">Name</div>
            <div className="column">Disease</div>
            <div className="column">Email</div>
            <div className="column">Action</div>
          </div>

          {loading ? (
            <p>Loading...</p>
          ) : ( (docslist.length>0)?(docslist.map(x => (
              <div className="row" key={x.id}>
                <div className="column">{x.id}</div>
                <div className="column">{x.name}</div>
                <div className="column">{x.disease}</div>
                <div className="column">{x.email}</div>
                <div className="column">
                  <button className="delete" onClick={() => deletion(x.id)}>Delete</button>
                </div>
              </div>
            ))):<p>No patients admitted</p>
            
          )}
        </div>
      </div>
    </div>
  );
}

export default Patients;