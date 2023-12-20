import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import axios from 'axios';
import './Register.css';
const apiURL = import.meta.env.VITE_BACKEND_URL;

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleRegistration = async () => {
    try {
      const res = await axios.post(`${apiURL}/user/register`, {
        name,
        email,
        password,
      });

      if (res.status === 201 && res.data.user) {
        toast.success("Successfully Registered!!");
        setTimeout(() => {
          navigate('/');
        }, 2000);
      }
    } catch (error) {
      console.log(error);
      toast.error(error?.message);
    }
  };

  return (
    <div className='register__page__container'>
      <div className='register__body'>
        <h1>Register on LexiLearn</h1>
        <div className='register__form'>
          <div>
            <input
              className='register__input'
              value={name}
              onChange={(e) => setName(e.target.value)}
              type="text"
              placeholder="Name"
            />
            <br />
            <input
              className='register__input'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              placeholder="Email"
            />
            <br />
            <input
              className='register__input'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              placeholder="Password"
            />
            <br />
            <input
              type="submit"
              className="register__btn"
              value="Register"
              onClick={handleRegistration}
            />
            <br />
            <h3>
              Already Registered? <Link to='/'>Click Here</Link> to Login
            </h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
