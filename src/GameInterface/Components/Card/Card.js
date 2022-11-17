import React from 'react';
import Tilt from 'react-parallax-tilt';
import './Card.css';

const Card = ({ card }) => {

    // console.log(card.image)

    return (
        <Tilt scale={1.1} tiltMaxAngleX={10} tiltMaxAngleY={10} >
            <div className='card-container'>
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
        </Tilt>
    )
}

export default Card;