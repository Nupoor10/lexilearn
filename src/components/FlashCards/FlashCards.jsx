import React, { useState} from 'react';
import ObjectDetector from './ObjectDetector';
import CardsContainer from './CardsContainer';

const FlashCards = () => {

  const [ activeTab, setActiveTab ] = useState('cards');

  const showCardsHandle = () => {
    setActiveTab('cards')
  }

  const addCardsHandle = () => {
    setActiveTab('cam')
  }

  return (
    <div className='cards__page__wrapper'>
      <h1>Flash Cards</h1>
      <div className='tabs__container'>
        <button onClick={showCardsHandle} className='secondary__btn'>FLASHCARDS</button>
        <button onClick={addCardsHandle} className='secondary__btn'>NEW CARD</button>
      </div>
      { activeTab === "cards" ? (
        <CardsContainer />
      ) : (
        <ObjectDetector />
      )}
    </div>
  )
}

export default FlashCards