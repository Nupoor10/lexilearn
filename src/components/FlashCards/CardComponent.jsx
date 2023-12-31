import React from 'react'
import toast from 'react-hot-toast';
import axios from "axios";
import { useAuthContext } from '../../hooks/useAuthContext';
import './FlashCards.css'
const apiURL = import.meta.env.VITE_BACKEND_URL;

const CardComponent = ({id, name, imageUrl}) => {

  const { user } = useAuthContext();

  const deleteCard = async () => {
    try {
      if(user) {
        const config = {
          headers: {
            Authorization: `Bearer ${user?.accessToken}`,
          },
        };
        const response = await axios.delete(`${apiURL}/card/delete/${id}`, config);
        if(response && response.status == 200) {
          toast.success("Card deleted successfully!!")
        }
      }
    } catch(error) {
      console.log(error);
      toast.error(error?.message);
    }
  }

  return (
    <div className="card__component">
      <h2>{name.toUpperCase()}</h2>
      <img src={imageUrl} />
      <div>
        <span onClick={deleteCard}>🗑️</span>
      </div>
    </div>
  )
}

export default CardComponent;