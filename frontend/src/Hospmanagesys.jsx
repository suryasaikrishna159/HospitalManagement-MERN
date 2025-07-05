import React,{useState,useEffect} from "react";
import axios from "axios";


function Hospmanagesys(){

    let [totaldocs,settotaldocs]=useState(0);
    let [totalpatients,settotalpatients]=useState(0);
    let [totalappointments,settotalappointments]=useState(0);
    let [appointmentstoday,setappointmentstoday]=useState(0);
    let [allappointments,setappointments]=useState([]);

    
    useEffect(()=>{
        const findtotaldocs=async ()=>{
            try{
                const n = await axios.get("http://localhost:5000/api/v1/doctors");
                const len=n.data.doctorsdata.length;
                settotaldocs(len);
            }
            catch(err){
                console.log(err); 
            }
        }
        const findtotalpatients=async ()=>{
            try{
                const n = await axios.get("http://localhost:5000/api/v1/patients");
                const len=n.data.patientdata.length;
                settotalpatients(len);
            }
            catch(err){
                console.log(err); 
            }
        }
        const findtotalappointments=async ()=>{
            try{
                const n = await axios.get("http://localhost:5000/api/v1/appointments");
                const len=n.data.appointmentsdata.length;
                settotalappointments(len);
            }
            catch(err){
                console.log(err); 
            }
        }
        const findtotalappointmentstoday = async () => {
            try {
                const res = await axios.get("http://localhost:5000/api/v1/appointments");
                const appointments = res.data.appointmentsdata;
                setappointments(appointments);

                const today = new Date();
                const isSameDay = (date1, date2) => {
                    return date1.getDate() === date2.getDate() &&
                        date1.getMonth() === date2.getMonth() &&
                        date1.getFullYear() === date2.getFullYear();
                };

                const todaysAppointments = appointments.filter(app => {
                    const appDate = new Date(app.date);
                    return isSameDay(appDate, today);
                });

                setappointmentstoday(todaysAppointments.length);
            } catch (err) {
                console.log(err);
            }
        };


        findtotaldocs();
        findtotalpatients();
        findtotalappointments();
        findtotalappointmentstoday();
    },[])



    return(
        <div className="body">


            <div className="quantity">
                <div className="docs sendrow">
                    Total Doctors
                    <p>{totaldocs === undefined ? "loading..." : totaldocs ?? 0}</p>
                </div>
                <div className="pats sendrow">
                    Total Patients
                    <p>{totalpatients === undefined ? "loading..." : totalpatients ?? 0}</p>
                </div>
                <div className="appois sendrow">
                    Total Appointments
                    <p>{totalappointments === undefined ? "loading..." : totalappointments ?? 0}</p>
                </div>
                <div className="appoistdy sendrow">
                    Appointments Today
                    <p>{appointmentstoday === undefined ? "loading..." : appointmentstoday ?? 0}</p>
                </div>
            </div>


            <div className="main">
                <h5>Appointments</h5>
                <div className="appointments_container">
                    <div className="heading">
                        <h6 className="column">id</h6>
                        <h6 className="column">patient_name</h6>
                        <h6 className="column">doctor_name</h6>
                        <h6 className="column">status</h6>
                        <h6 className="column">date</h6>
                    </div>
                    {( allappointments.length>0)?(<ul>
                        {allappointments.map(x => (
                            <li key={x.id}>
                            <div className="column">{x.id}</div>
                            <div className="column">{x.patient_name}</div>
                            <div className="column">{x.doctor_name}</div>
                            <div className="column">{x.status}</div>
                            <div className="column">
                                {new Date(x.date).toLocaleDateString("en-GB")}
                            </div>
                            </li>
                        ))}
                    </ul>):(<p>No Appointments</p>)}
                    


                </div>
            </div>
        </div>
    )
}
export default Hospmanagesys;
