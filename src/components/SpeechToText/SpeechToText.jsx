import React, { useState, useRef } from "react";
import axios from 'axios'; 
import { AudioRecorder, useAudioRecorder } from 'react-audio-voice-recorder';
import toast from 'react-hot-toast';
import { useAuthContext } from '../../hooks/useAuthContext';
import "./SpeechToText.css"
const apiURL = import.meta.env.VITE_BACKEND_URL;

const SpeechToText = () => {

  const [audioFile, setAudioFile] = useState(null)
  const [transcript, setTranscript] = useState("")
  const transcriptRef = useRef()

  const { user } = useAuthContext();

  const recorderControls = useAudioRecorder(
    {
      noiseSuppression: true,
      echoCancellation: true,
    },
    (err) => console.log(err)
  );
  const addAudioElement = async(blob) => {
    const url = URL.createObjectURL(blob);
    const buffer = await blob.arrayBuffer()
    const file = new File([buffer], "audio.webm", {
      type: blob.type,
      lastModified: Date.now(),
    })
    setAudioFile(file)
    const audio = document.createElement("audio");
    audio.src = url;
    audio.controls = true;
    const audioHolder = document.getElementById('audio');
    audioHolder.appendChild(audio);
  };

  const handleUpload = async() => {
    try {
      if(user) {
        const formData = new FormData();
        formData.append('file', audioFile);
        const config = {
          headers: {
            Authorization: `Bearer ${user?.accessToken}`,
            'Content-Type': 'multipart/form-data'
          },
        };
        const response = await axios.post(`${apiURL}/speechtotext/`, formData, config);
        if(response && response.status == 200) {
          setTranscript(response?.data?.transcript)
        }
      }
    } catch(error) {
      console.log(error);
      toast.error(error?.message);
    }
  }

    const handleCopyClick = async () => {      
      try {
        const textToCopy = transcriptRef.current.textContent;
        await navigator.clipboard.writeText(textToCopy);
        toast.success('Text copied to clipboard');
      } catch (error) {
        console.error('Failed to copy text: ', error);
        toast.error('Failed to copy text to clipboard');
      }
    };

    return (
      <div className="stt__page__container">
        <h1>Speech to text</h1>
        <AudioRecorder 
          onRecordingComplete={(blob) => addAudioElement(blob)}
          recorderControls={recorderControls}
          showVisualizer={true}
        />
        <button className="primary__btn" onClick={recorderControls.stopRecording}>Stop recording</button>
        <button className="primary__btn" onClick={handleUpload}>SUBMIT</button>
        <div id="audio"></div>
        <div className="stt__content">
          <div ref={transcriptRef}>
            {transcript}
          </div>
          {(transcript.length) > 0 && 
            (<button className="secondary__btn" onClick={handleCopyClick}>Copy</button>)
          }
        </div>
      </div>
    );
}

export default SpeechToText;
