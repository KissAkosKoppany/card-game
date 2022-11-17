import React, { useEffect, useState } from 'react';
import { useTypeMessage } from '../../Hooks/typeMessageAnimation';
import { soundEffects } from '../soundEffects';

const Victory = ({ bossHp, handleNextBossRouteChange }) => {

  const [victory, setVictory] = useState('');

  useEffect(() => {
    if(bossHp === 0) {
      setVictory('Victory');
      setTimeout(() => {
        soundEffects.victory.play();
      }, 2000)
    }
  }, [bossHp])

  // console.log(victory)

  return (
    <div className='battle-end-content'>
        <h1 className='battle-end-title'>{useTypeMessage(victory)}</h1>
        <button onClick={handleNextBossRouteChange} className='battle-end-button'>Next Boss</button>
    </div>  
  )
}

export default Victory;