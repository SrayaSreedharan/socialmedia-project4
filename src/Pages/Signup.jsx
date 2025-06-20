import React, { useState, useEffect } from 'react';
import '../Pages/Signup.css';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { signupUser } from '../Redux/Slice/Authslice'; 

const Signup = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { status, error: reduxError, data } = useSelector((state) => state.user);

  const [signup, setSignup] = useState({
    name: '',
    email: '',
    username: '',
    password: ''
  });

  const [error, setError] = useState({});

  const validate = () => {
    const errormsg = {};
    if (!signup.username) errormsg.username = "Enter username";
    if (!signup.email) errormsg.email = "Enter email";
    else if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(!signup.email)){
            errormsg.email="Email is not valid"
        }
    if (!signup.password) errormsg.password = "Enter password";
    setError(errormsg);
    return Object.keys(errormsg).length === 0;
  };

    const handleChange = (e) => {
      setSignup({ ...signup, [e.target.name]: e.target.value });
      setError({});  
    };

    const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;  

    dispatch(signupUser(signup)).unwrap().then((response) => {
        console.log(response.data.username)
        console.log(response.data._id)
        localStorage.setItem("userId",response.data._id)
        localStorage.setItem("username",response.data.username)
        navigate('/login'); 
      })
      .catch((err) => {
        console.log('Signup failed:', err);
      });
  };

  useEffect(() => {
    if (status === 'succeeded') {
      
      console.log('Signup successful!');
    }
  }, [status]);

  return (
    <div className="register">
      <div className="card">
        <div className="left"></div>
        <div className="right">
          <h1>Register</h1>
          <form onSubmit={handleSubmit}>
            <label style={{ color: 'red',marginTop:'-20px' }}>{error.username}</label>
            <input type='text' name="username" placeholder='Username' onChange={handleChange} />
            <br />
            <label style={{ color: 'red' }}>{error.email}</label>
            <input type='email' name="email" placeholder='Email' onChange={handleChange} />
            <br />
            <label style={{ color: 'red' }}>{error.password}</label>
            <input type='password' name="password" placeholder='Password' onChange={handleChange} />
            <br />
            {reduxError && <p style={{ color: 'red' }}>{reduxError}</p>}
            <button type='submit'>
              {status === 'loading' ? 'Registering...' : 'Register'}
              {status === 'succeeded' && <p>Signup successful! Welcome, {data?.name || signup.name}</p>}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
export default Signup;
