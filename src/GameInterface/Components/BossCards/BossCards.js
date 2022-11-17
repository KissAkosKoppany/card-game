import React, { useState } from 'react';
import './BossCard.css';
import { MdKeyboardArrowLeft } from 'react-icons/md';
import { MdKeyboardArrowRight } from 'react-icons/md';
import { soundEffects } from '../Fight/soundEffects';
import Tilt from 'react-parallax-tilt';

const BossCards = () => {

  const [boss, setBoss] = useState(0);
  const [showButtonLeft, setShowButtonLeft] = useState(false);
  const [showButtonRight, setShowButtonRight] = useState(true);
  const bossStats = [
      {
        name: 'Kyuubi',
        attack: 500,
        hp: 7000,
        theme: 'orange',
        skill: 'While his hp is below 20%, attack will increase by 30% after every round.',
        image: 'cardImg/kurama1.webp'
      },
      {
        name: 'Beast Titan',
        attack: 400,
        hp: 9000,
        theme: 'brown',
        skill: 'Has 20% chance to crit. After every crit heals himself by 100 hp.',
        image: 'cardImg/beastTitan.jpg'
      },
      {
        name: 'Ryuk',
        attack: 600,
        hp: 8000,
        theme: 'black',
        skill: 'On every attack has 5% chance to oneshot the target.',
        image: 'cardImg/ryuk.jpg'
      },
      {
        name: 'Dio Brando',
        attack: 700,
        hp: 7000,
        theme: 'yellow',
        skill: 'Has 20% chance to stun all enemies for 1 round, dealing damage for everyone.',
        image: 'cardImg/dio3.jpg'
      }
  ];

  function nextBossCardChange() {
    soundEffects.buttonPress.play();
    switch(boss) {
      case 0:
        setShowButtonLeft(true)
        setShowButtonRight(true)
        setBoss(1)
        break;
      case 1:
        setShowButtonLeft(true)
        setShowButtonRight(true)
        setBoss(2)
        break;
      case 2:
        setShowButtonLeft(true)
        setShowButtonRight(false)
        setBoss(3)
        break;
      default:
        break;
    }
  }

  function prevBossCardChange() {
    soundEffects.buttonPress.play();
    switch(boss) {
      case 1:
        setShowButtonLeft(false)
        setShowButtonRight(true)
        setBoss(0)
        break;
      case 2:
        setShowButtonLeft(true)
        setShowButtonRight(true)
        setBoss(1)
        break;
      case 3:
        setShowButtonLeft(true)
        setShowButtonRight(true)
        setBoss(2)
        break;
      default:
        break;
    }
  }

  function bossAttackSound() {
    switch(boss) {
      case 0:
        soundEffects.kyuubi.play();
        break;
      case 1:
        soundEffects.beastTitan2.play();
        break;
      case 2:
        soundEffects.ryuk1.play();
        break;
      case 3:
        soundEffects.dio.play();
        setTimeout(() => {
          soundEffects.dioStun.play();
        }, 1400)
        break;
      default:
        break;
    }
  }

  return (
    <div className='boss-cards-container'>
      <Tilt tiltMaxAngleX={10} tiltMaxAngleY={10} >
        <div className='boss-container'>
          <div onClick={bossAttackSound} title='Click for sound effect!' className='fight-card boss-card boss-card-scale'>
              <div className='card-content card-content-front'>
                <div className={`stat-circle stat-circle-left ${bossStats[boss].theme}-dark`}>
                  <p className='stat-indicator'>{bossStats[boss].attack}</p>
                </div>
                <div className={`stat-circle stat-circle-right ${bossStats[boss].theme}-dark`}>
                  <p className='stat-indicator'>{bossStats[boss].hp}</p>
                </div>
                <div className={`img-container`}>
                  <img className={`card-img boss-img ${bossStats[boss].theme}`} alt='' src={bossStats[boss].image} />
                </div>
                <div className={`inner-card ${bossStats[boss].theme}`}>
                  <div className='inner-card-content boss-title'>
                    <div className={`card-title-container ${bossStats[boss].theme}-dark`}>
                      <h1 className='card-title'>{bossStats[boss].name}</h1>
                    </div>
                  </div>
                </div>
              </div>
          </div>
        </div>
      </Tilt>
      <div className='boss-skill'>
        <h1>Skill description:</h1>
        <p className='boss-skill-description'>{bossStats[boss].skill}</p>
      </div>
      <MdKeyboardArrowLeft onClick={prevBossCardChange} className={`${showButtonLeft && 'show'} boss-button boss-button-left`} />
      <MdKeyboardArrowRight onClick={nextBossCardChange} className={`${showButtonRight && 'show'} boss-button boss-button-right`} />
    </div>
  )
}

export default BossCards;