import React, { useState } from 'react';
import './FightCard.css';
import Tilt from 'react-parallax-tilt';
import { MdCheck } from 'react-icons/md';
import { MdClose } from 'react-icons/md';
import { soundEffects } from './soundEffects';


const FightCard = ({ card, handleCardSelect, handleRemoveSelectedCard }) => {

  const [flip, setFlip] = useState(false)

  return (
    <Tilt scale={1.1} tiltMaxAngleX={6} tiltMaxAngleY={6} >
      <div onClick={() => {setFlip(!flip); soundEffects.flipCard.play()}} className={flip ? 'fight-card flip' : 'fight-card'}>
            <div className='card-content card-content-front'>
              <div className={`stat-circle stat-circle-left ${card.theme}-dark`}>
                <p className='stat-indicator'>{card.attack}</p>
              </div>
              <div className={`stat-circle stat-circle-right ${card.theme}-dark`}>
                <p className='stat-indicator'>{card.hp}</p>
              </div>
              <div className='img-container'>
                <img className={`card-img ${card.theme}`} alt='' src={`cardImg/${card.image}`} />
              </div>
              <div className={`inner-card ${card.theme}`}>
                <div className='inner-card-content'>
                  <div className={`card-title-container ${card.theme}-dark`}>
                    <h1 className='card-title'>{card.name}</h1>
                  </div>
                  <div className={`card-description-container ${card.theme}-dark`}>
                    <p className='card-description-about'>Unique skill:</p>
                    <p className='card-description-text'>{card.skill}</p>
                  </div>
                </div>
              </div>
            </div>
            <div className={`card-content card-content-back ${card.theme}`}>
              <MdClose className={`fight-card-select-button ${card.theme}-dark`} />
              <MdCheck 
                onClick={() => { 
                  handleCardSelect(card);
                  handleRemoveSelectedCard(card.id)
                }} 
                className={`fight-card-select-button ${card.theme}-dark`} />
            </div>
      </div>
            </Tilt>
  )
}

export default FightCard