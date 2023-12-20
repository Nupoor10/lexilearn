import React, { useState, useRef } from 'react'
import axios from 'axios';
import toast from 'react-hot-toast';
import { useAuthContext } from '../../hooks/useAuthContext';
import './Summary.css'
const apiURL = import.meta.env.VITE_BACKEND_URL;

const Summary = () => {
  const [text, setText] = useState('');
  const [summary, setSummary] = useState("")
  const summaryRef = useRef();

  const { user } = useAuthContext();

  const handleSummary = async() => {
    try {
      if(user) {
        const config = {
          headers: {
            Authorization: `Bearer ${user?.accessToken}`
          }
        };
        const response = await axios.post(`${apiURL}/summary/`, {text}, config);
        if(response && response.status == 200 && response.data) {
          setSummary(response.data.summary)
        }
      }
    } catch(error) {
      console.log(error)
      toast.error(error?.message);
    }
  }

  const handleCopyClick = async () => {
    try {
      const textToCopy = summaryRef.current.textContent;
      await navigator.clipboard.writeText(textToCopy);
      toast.success('Text copied to clipboard');
    } catch (error) {
      toast.error('Failed to copy text to clipboard');
    }
  };
  
  return (
    <div className='summary__page__container'>
      <h1>Summary</h1>
      <textarea
        placeholder="Enter text to summarize"
        value={text}
        onChange={(e) => {setText(e.target.value)}}
      />
      <button className="primary__btn" onClick={handleSummary}>Summarize</button>
      <div className='summary__content'>
        <div ref={summaryRef}>
          {summary}
        </div>
        {(summary?.length) > 0 && 
          (<button className="secondary__btn" onClick={handleCopyClick}>Copy</button>)
        }
      </div>
    </div>
  )
}

export default Summary
