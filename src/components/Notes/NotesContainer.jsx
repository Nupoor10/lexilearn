import React, { useState, useEffect } from 'react';
import { MdSearch } from 'react-icons/md';
import toast from 'react-hot-toast';
import axios from 'axios';
import { useAuthContext } from '../../hooks/useAuthContext';
import NotesCard from './NotesCard';
import './Notes.css';

const apiURL = import.meta.env.VITE_BACKEND_URL;

const NotesContainer = () => {
  const [notes, setNotes] = useState([]);
  const [searchText, setSearchText] = useState('');
  const { user } = useAuthContext();

  useEffect(() => {
    const fetchAllNotes = async () => {
      try {
        if (user) {
          const config = {
            headers: {
              Authorization: `Bearer ${user?.accessToken}`,
              'Content-Type': 'multipart/form-data',
            },
          };
          const response = await axios.get(`${apiURL}/note/all`, config);
          if (response && response.status === 200) {
            setNotes(response.data.notes);
          }
        }
      } catch (error) {
        console.log(error);
        toast.error(error?.message);
      }
    };

    fetchAllNotes();

    const refreshInterval = setInterval(() => {
      fetchAllNotes();
    }, 10000);

    return () => {
      clearInterval(refreshInterval);
    };
  }, [user]);

  return (
    <div className="all__notes__wrapper">
      <div className="search">
        <MdSearch className="icon" size="1.3em" />
        <input
          onChange={(event) => setSearchText(event.target.value)}
          type="text"
          placeholder="Type to search..."
        />
      </div>
      <div className="all__notes__container">
        {notes?.length > 0 ? (
          notes
            .filter((note) => {
              if (searchText === ' ') {
                return note;
              } else if (
                note.title.toLowerCase().includes(searchText.toLowerCase())
              ) {
                return note;
              }
            })
            .map((note) => (
              <NotesCard
                key={note._id}
                id={note._id}
                title={note.title}
                content={note.content}
                audioData={note.audioData}
              />
            ))
        ) : (
          <h1>No Notes Present</h1>
        )}
      </div>
    </div>
  );
};

export default NotesContainer;
