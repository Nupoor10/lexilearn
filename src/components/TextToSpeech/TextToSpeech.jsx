import React, { useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useAuthContext } from '../../hooks/useAuthContext';
import './TextToSpeech.css';
const apiURL = import.meta.env.VITE_BACKEND_URL;

const TextToSpeech = () => {
  const [text, setText] = useState('');
  const [audioUrl, setAudioUrl] = useState('');

  const { user } = useAuthContext();

  const handleConvertTextToSpeech = async() => {
    try {
      if(user) {
        const config = {
          headers: {
            Authorization: `Bearer ${user?.accessToken}`
          },
        };
        const response = await axios.post(`${apiURL}/texttospeech/`, {text}, config);
        if(response && response.status == 200 && response.data) {
          setAudioUrl(response.data.audio);
        }
      }
    } catch(error) {
      console.log(error)
      toast.error(error?.message);
    }
  };

  return (
    <div className='tts__page__container'>
      <h1>Text to Speech</h1>
      <textarea
        placeholder="Enter text to convert to speech"
        value={text}
        onChange={(e) => {setText(e.target.value)}}
      />
      <button className="primary__btn" onClick={handleConvertTextToSpeech}>Convert to Speech</button>
      {audioUrl && (
        <audio controls>
          <source src={audioUrl} type="audio/mpeg" />
          Your browser does not support the audio element.
        </audio>
      )}
    </div>
  );
};

export default TextToSpeech;
