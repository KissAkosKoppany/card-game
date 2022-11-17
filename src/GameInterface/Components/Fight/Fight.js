import React, { useState } from 'react';
import './Fight.css';
import MainFightContainer from './Components/MainFightContainer';
import { soundEffects } from './soundEffects';

const Fight = () => {

  const [bossRoute, setBossRoute] = useState('kyuubi');

  function handleNextBossRouteChange() {
    soundEffects.buttonPress.play();
    bossRoute === 'kyuubi' && setBossRoute('beastTitan')
    bossRoute === 'beastTitan' && setBossRoute('ryuk')
    bossRoute === 'ryuk' && setBossRoute('dio')
    bossRoute === 'dio' && setBossRoute('kyuubi')
  }

  

  return (
    <div className='fight-container'>
      <div className='fight-nav'>
        <p onClick={() => {setBossRoute('kyuubi'); soundEffects.buttonPress.play()} } className={bossRoute === 'kyuubi' ? 'nav-link active' : "nav-link"}>Kyuubi</p>
        <p onClick={() => {setBossRoute('beastTitan'); soundEffects.buttonPress.play()}} className={bossRoute === 'beastTitan' ? 'nav-link active' : "nav-link"}>Beast Titan</p>
        <p onClick={() => {setBossRoute('ryuk'); soundEffects.buttonPress.play()}} className={bossRoute === 'ryuk' ? 'nav-link active' : "nav-link"}>Ryuk</p>
        <p onClick={() => {setBossRoute('dio'); soundEffects.buttonPress.play()}} className={bossRoute === 'dio' ? 'nav-link active' : "nav-link"}>Dio Brando</p>
      </div>
      <>
        <MainFightContainer bossRoute={bossRoute} handleNextBossRouteChange={handleNextBossRouteChange} />        
      </>
    </div>
  )
}

export default Fight;