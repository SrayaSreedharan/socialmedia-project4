import React from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const Fhome = () => {
  return (
    <div className="position-relative vh-100 w-100 overflow-hidden">
      <div className="position-absolute top-0 start-0 h-100 w-100 d-flex">
        <div style={{ width: '50%', backgroundColor: 'white' }}></div>
        <div style={{ width: '50%', backgroundColor: 'rgb(193, 190, 255)' }}></div>
      </div>
      <div className="d-flex justify-content-center align-items-center vh-100 position-relative" style={{ zIndex: 1 }}>
        <div className="text-center p-5 shadow-lg bg-white rounded" style={{maxWidth: '500px',width: '90%'}}>
          <h1 className="mb-3">👋 Welcome </h1>
          <p className="mb-4 text-muted">A place where people connect and interact with each other, sharing information, opinions, experiences, and growing together.</p>
          <div className="d-flex justify-content-center gap-3">
            <Link to="/signup" className="btn btn-lg px-4 rounded-0 text-white" style={{ backgroundColor: '#938eef' }}>Sign Up</Link>
            <Link to="/login" className="btn btn-outline-secondary btn-lg px-4 rounded-0">Log In</Link>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Fhome;

