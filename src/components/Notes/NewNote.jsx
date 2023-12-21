import React, {useState} from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useAuthContext } from '../../hooks/useAuthContext';
import './Notes.css'
const apiURL = import.meta.env.VITE_BACKEND_URL;

const NewNote = () => {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('');

  const { user } = useAuthContext();

  const handleNoteSubmit =  async() => {
    try {
      if (user) { 
        const config = {
          headers: {
            Authorization: `Bearer ${user?.accessToken}`,
          },
        };
        const response = await axios.post(`${apiURL}/note/add`, { title, content }, config);
        if(response && response.status == 201) {
          toast.success("Note Added Successfully");
          setTitle('');
          setContent('');
        }
      }
      } catch (error) {
        console.log(error);
        toast.error(error?.message)
      }
    }

  return (
    <div className="new__note__container" >
      <input value={title} onChange={(e) => setTitle(e.target.value)} type='text' name='title' placeholder='Enter a title'></input>
      <textarea className='text-area' value={content} onChange={(e) => setContent(e.target.value)} type='text' name='content' placeholder='Enter your content' />
      <button className='primary__btn' onClick={handleNoteSubmit} type='button'>ADD</button>
    </div>
  )
}

export default NewNote