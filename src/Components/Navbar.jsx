import React from 'react';
import { Link } from 'react-router-dom';
import { FaBell, FaEnvelope } from 'react-icons/fa'; 
import { Heart } from 'lucide-react';

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-3">
      <span className="navbar-brand text-white">WELCOME</span>
      <div className="ms-auto d-flex align-items-center gap-4 text-white">
        <div style={{ position: 'relative' }}>
          <Heart />
          <span className="badge bg-danger rounded-circle" style={{position: 'absolute',top: '-8px',right: '-10px',fontSize: '0.6rem',}}>8</span>
        </div>
        <div style={{ position: 'relative' }}>
          <FaEnvelope size={20} />
          <span className="badge bg-danger rounded-circle" style={{position: 'absolute',top: '-8px',right: '-10px',fontSize: '0.6rem',}}>6</span>
        </div>
        <div style={{ position: 'relative' }}>
          <FaBell size={20} />
          <span className="badge bg-danger rounded-circle" style={{position: 'absolute',top: '-8px',right: '-10px',fontSize: '0.6rem',}}>5</span>
        </div>
        <Link to="/login" style={{ textDecoration: 'none', color: 'white' }}> LOGOUT</Link>
      </div>
    </nav>
  );
};
export default Navbar;

