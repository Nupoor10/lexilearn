import React from 'react';
import { AiFillInstagram, AiFillYoutube, AiFillTwitterCircle, AiFillLinkedin } from "react-icons/ai";
import './Footer.css';

const Footer = () => {
  return (
    <div className='footer__container'>
      <div className='footer__body'>
        <div className='footer__about'>
          <h1>ABOUT</h1>
          <p>
            LexiLearn is a specialized educational app designed to empower dyslexic students. It offers a user-friendly interface, personalized reading exercises, and innovative tools to enhance reading and comprehension skills. LexiLearn aims to make learning enjoyable and accessible, fostering confidence and academic success for dyslexic learners.
          </p>
        </div>
        <div className='footer__links'>
          <a style={{color: 'white'}} target='_blank' rel='noreferrer' href='https://github.com/Nupoor10/lexilearn'><AiFillGithub /></a>
          <a style={{color: 'white'}} target='_blank' rel='noreferrer' href='https://github.com/Nupoor10/lexilearn-backend'><AiFillGithub /></a>
          <a style={{color: 'white'}} target='_blank' rel='noreferrer' href='https://www.linkedin.com/in/nupoor-shetye-8452111a7/'><AiFillLinkedin /></a>
          <a style={{color: 'white', textDecoration: 'none'}} target='_blank' rel='noreferrer' href='https://peerlist.io/nupoor'>🅿️</a>
        </div>
      </div>
      <hr />
      <div className='footer__copyright'>
        <h3>Copyright @ {new Date().getFullYear()} All Rights Reserved by LexiLearn</h3>
      </div>
    </div>
  );
};

export default Footer;
