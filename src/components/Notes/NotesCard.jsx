import React, { useState} from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { AiFillDelete } from "react-icons/ai";
import { LuClipboardEdit } from "react-icons/lu";
import { FaRegEye } from "react-icons/fa";
import { useAuthContext } from '../../hooks/useAuthContext';
import NotesPreview from './NotesPreview';
import './Notes.css'
const apiURL = import.meta.env.VITE_BACKEND_URL;

const NotesCard = ({ id, title, content }) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const { user } = useAuthContext();

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

     const handleDelete = async() => {
      try {
				if (user && id) {
					const config = {
						headers: {
						  Authorization: `Bearer ${user?.accessToken}`,
						},
					  };
					const response = await axios.delete(`${apiURL}/note/delete/${id}`, config);
					if(response && response.status ===200) {
						toast.success("Deleted successfully");
					}
				}
			} catch (error) {
				console.log(error);
				toast.error(error?.message);
			}
    }

    const handleEdit = () => {
      setIsEditing(true);
      openModal();
    }

      return (
        <div className="note__card">
          <div className="note__text">
            <h2>{title?.toUpperCase()}</h2>
            <p>{content?.substring(0, 50)}</p>
          </div>
          <div className="note__icons">
            <div onClick={openModal}><FaRegEye cursor={'pointer'} /></div>
            <div onClick={handleEdit}><LuClipboardEdit cursor={'pointer'} /></div>
            <span onClick={handleDelete}><AiFillDelete cursor={'pointer'} /></span>
          </div>
          <NotesPreview isOpen={modalIsOpen} closeModal={closeModal} id={id} title={title} content={content} isEditing={isEditing} setIsEditing={setIsEditing}/>
        </div>
      );
}

export default NotesCard