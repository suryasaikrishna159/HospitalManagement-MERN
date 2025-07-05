import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <header className="navbar">
      <p className="title"><b>Hospital Management System</b></p>
      <Link to="/">Dashboard</Link>
      <Link to="/doctors">Doctors</Link>
      <Link to="/patients">Patients</Link>
      <Link to="/appointments">Appointments</Link>
    </header>
  );
}

export default Navbar;
