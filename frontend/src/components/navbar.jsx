// Navbar.js
import { Link } from 'react-router-dom';
import './Navbar.css';

function Navbar() {
  return (
    
    <div>
      <nav className="navbar">
        <h1>U.S. Stock Market Data</h1>
        <div className="navbar-links">
          <Link to="/login">Log in</Link>
          <Link to="/register">Register</Link>
        </div>
      </nav>
      <div className="grid-container">
          <div className="graph-block1">Graph </div>
        </div>
    </div>

    
  );
}

export default Navbar;
