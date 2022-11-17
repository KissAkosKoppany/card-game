import React, { useEffect, useState } from 'react';
import { useTypeMessage } from '../../Hooks/typeMessageAnimation';
import { soundEffects } from '../soundEffects';

const Defeat = ({ fightingCards, selectedCards, refresh }) => {

  const [defeat, setDefeat] = useState('');

  useEffect(() => {
    if(fightingCards.length === 0 && selectedCards.length) {
      setDefeat('Defeat');
      setTimeout(() => {
        soundEffects.defeat.play();
      }, 2000)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fightingCards])

  // console.log(victory)

  return (
    <div className='battle-end-content'>
        <h1 className='battle-end-title'>{useTypeMessage(defeat)}</h1>
        <button onClick={refresh} className='battle-end-button'>Try again</button>
    </div>  
  )
}

export default Defeat;