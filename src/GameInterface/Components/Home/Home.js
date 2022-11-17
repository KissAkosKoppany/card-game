import React, { useState } from 'react';
import './Home.css';
import gameTrailer from './GameTrailer/gameTrailer.mp4';
import { MdKeyboardArrowDown } from 'react-icons/md';
import { MdKeyboardArrowUp } from 'react-icons/md';
import { AiOutlineCopyright } from 'react-icons/ai';


const Home = () => {

  const [buttonAnimation, setButtonAnimation] = useState(true)
  const [section, setSection] = useState(true)
  const [sectionChangeDownAniamtion, setSectionChangeDownAnimation] = useState(false);
  const [sectionChangeUpAniamtion, setSectionChangeUpAnimation] = useState(false);
  
  function aboutButtonAnimationStop() {
    setButtonAnimation(false)
  }
  
  function aboutButtonAnimationStart() {
    setButtonAnimation(true)
  }

  function sectionChangeDown() {
    setSectionChangeDownAnimation(true)
    setTimeout(() => {
      setSection(!section)
    }, 500)
    setTimeout(() => {
      setSectionChangeDownAnimation(false)
    }, 2100)
  }

  function sectionChangeUp() {
    setSectionChangeUpAnimation(true)
    setTimeout(() => {
      setSection(!section)
    }, 500)
    setTimeout(() => {
      setSectionChangeUpAnimation(false)
    }, 2100)
  }

  return (
    <>
      {
        section ?
        <section 
          className={
            `home-section 
            ${sectionChangeDownAniamtion && 'animate__animated animate__fadeOutUp animate__slow'}
            ${sectionChangeUpAniamtion && 'animate__animated animate__fadeInDown animate__slow'}`
          }
        >
          <h1 className='home-title'>Anime styled card game</h1>
          <video className='video-trailer' autoPlay controls loop>
            <source src={gameTrailer} />
          </video>
          <div className='home-about'>
            <p>Learn more</p>
            <MdKeyboardArrowDown 
              onClick={sectionChangeDown}
              onMouseLeave={aboutButtonAnimationStart} 
              onMouseEnter={aboutButtonAnimationStop} 
              className={`section-change-button ${buttonAnimation && 'animate__animated animate__heartBeat animate__slower animate__infinite'}`} 
            />
          </div>
        </section>
        :
        <section 
          className={
            `about-section 
            ${sectionChangeDownAniamtion && 'animate__animated animate__fadeInUp animate__slow'}
            ${sectionChangeUpAniamtion && 'animate__animated animate__fadeOutDown animate__slow'}`
          }
        >
          <MdKeyboardArrowUp
            onClick={sectionChangeUp}
            onMouseLeave={aboutButtonAnimationStart} 
            onMouseEnter={aboutButtonAnimationStop}
            className={`section-change-button section-two-change-button ${buttonAnimation && 'animate__animated animate__heartBeat animate__slower animate__infinite'}`}
          />
          <h2>Game Description</h2>
          <p>
            This is an anime styled turn based game with lots of characters to choose from. Every character has his own unique ability.
            Choose your characters wisely and try to defeat the bosses.
          </p>
          <h3>Gameplay :</h3>
          <ol className='gameplay-description'>
            <li>Go to the Fight section.</li>
            <li>Choose the boss you want to fight against.</li>
            <li>Select four cards.</li>
            <li>Choose an action (basic attack or unique skill) and wait for the boss to attack.</li>
          </ol>
          <p>
            Learn more about the abilitys at the Cards and Boss Cards section.
          </p>
          <p className='copy-right'>
          <AiOutlineCopyright className='copy-right-icon' />
            2022 Developed by Kiss Akos
          </p>
        </section>
      }
    </>
  )
}

export default Home;