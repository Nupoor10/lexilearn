import React, { useEffect, useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { ImCancelCircle } from 'react-icons/im';
import { useAuthContext } from '../../hooks/useAuthContext';
import './Notes.css';

const apiURL = import.meta.env.VITE_BACKEND_URL;

const NotesPreview = ({ isOpen, closeModal, id, title, content, isEditing, setIsEditing }) => {
  const [newTitle, setNewTitle] = useState('');
  const [newContent, setNewContent] = useState('');
  const { user } = useAuthContext();

  useEffect(() => {
    if (isEditing) {
      setNewTitle(title);
      setNewContent(content);
    }
  }, [title, content, isEditing]);

  const handleNoteUpdate = async () => {
    try {
      if (user) {
        const config = {
          headers: {
            Authorization: `Bearer ${user?.accessToken}`,
          },
        };
        const response = await axios.put(
          `${apiURL}/note/update/${id}`,
          { title: newTitle, content: newContent },
          config
        );
        if (response && response.status === 200) {
          toast.success('Note Updated Successfully');
          setIsEditing(false);
          closeModal();
        }
      }
    } catch (error) {
      console.log(error);
      toast.error(error?.message);
    }
  };

  return (
    <>
      <div className={isOpen ? 'overlay' : 'hidden'} onClick={closeModal}></div>
      <div className={isOpen ? 'modal' : 'hidden'}>
        <button className="closeButton" onClick={closeModal}>
          <ImCancelCircle />
        </button>
        <div className="modal__content">
          {isEditing ? (
            <div className="new__note__container">
              <input
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                type="text"
                name="title"
                placeholder="Enter a title"
              />
              <textarea
                value={newContent}
                onChange={(e) => setNewContent(e.target.value)}
                type="text"
                name="content"
                placeholder="Enter your content"
              />
              <button
                className="primary__btn"
                onClick={handleNoteUpdate}
                type="button"
              >
                UPDATE
              </button>
            </div>
          ) : (
            <>
              <h1>Title: {title}</h1>
              <h2>Content</h2>
              <p>{content}</p>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default NotesPreview;
