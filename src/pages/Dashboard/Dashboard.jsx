import React, { useState, useRef } from 'react';
import { FaUserCircle } from "react-icons/fa"
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../../hooks/useAuthContext';
import Sidebar from '../../components/Sidebar/Sidebar';
import Notes from '../../components/Notes/Notes';
import TextToSpeech from '../../components/TextToSpeech/TextToSpeech';
import Summary from '../../components/Summary/Summary';
import SpeechToText from '../../components/SpeechToText/SpeechToText';
import FlashCards from '../../components/FlashCards/FlashCards';
import "./Dashboard.css";

const Dashboard = () => {
  const [activeComponent, setActiveComponent] = useState('notes');
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const { dispatch, user } = useAuthContext();
  const navigate = useNavigate();

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleButtonClick = (componentName) => {
    setActiveComponent(componentName);
  }

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
        <Sidebar handleButtonClick={handleButtonClick} />
        <div className='main__content__container'>
          {activeComponent === 'notes' && <Notes />}
          {activeComponent === 'stt' && <SpeechToText />}
          {activeComponent === 'summary' && <Summary />}
          {activeComponent === 'tts' && <TextToSpeech />}
          {activeComponent === 'cards' && <FlashCards />}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
