import React, { useState, useRef } from 'react';
import { FaUserCircle } from "react-icons/fa"
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../../hooks/useAuthContext';
import "./Dashboard.css";

const Dashboard = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const { dispatch, user } = useAuthContext();
  const navigate = useNavigate();

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });
    navigate("/");
  };

  return (
    <div className='dashboard__page__container'>
      <div className='dashboard__header'>
        <h1>
          👋 Welcome Back,{" "}
          {user && <span>{user.name}</span>}
        </h1>

        <div className='dashboard__header__icons__container'>
          <FaUserCircle className='dashboard__header__icons' onClick={toggleDropdown} />
          <div style={{ display: isOpen ? "block" : "none" }} className="user__dropdown" ref={dropdownRef} onClick={handleLogout}>
            Logout
          </div>
        </div>
      </div>
      <div className='dashboard__page__main'>
        <div>Sidebar</div>
        <div className='main__content__container'>
          Main Content
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
