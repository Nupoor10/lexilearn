import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import axios from 'axios';
import { useAuthContext } from '../../hooks/useAuthContext';
import './Login.css';
const apiURL = import.meta.env.VITE_BACKEND_URL;

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const { dispatch } = useAuthContext();

  const handleLogin = async () => {
    try {
      const res = await axios.post(`${apiURL}/user/login`, {
        email,
        password,
      });

      if (res.status === 200 && res.data.user && res.data.token) {
        dispatch({
          type: 'LOGIN',
          payload: {
            accessToken: res.data.token,
            name: res.data.user.name,
          },
        });

        localStorage.setItem("User", JSON.stringify({
          accessToken: res.data.token,
          name: res.data.user.name,
        }));

        toast.success("Successfully Logged In");

        setTimeout(() => {
          navigate("/home");
        }, 2000);
      }
    } catch (error) {
      console.log(error);
      toast.error(error?.message);
    }
  };

  return (
    <div className='login__page__container'>
      <div className='login__body'>
        <h1>Login To LexiLearn</h1>
        <div className='login__form'>
          <div>
            <input
              className='login__input'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              placeholder="Enter Email"
            />
            <br />
            <input
              className='login__input'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              placeholder="Enter Password"
            />
            <br />
            <button type="submit" className="login__btn" onClick={handleLogin}>
              Login
            </button>
            <h3>
              Not Registered Yet? <Link to='/register'>Click Here</Link> to Register
            </h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
