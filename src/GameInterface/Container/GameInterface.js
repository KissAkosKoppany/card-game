import React from 'react';
import './GameInterface.css';
import Cards from '../Components/Cards/Cards';
import Home from '../Components/Home/Home';
import Fight from '../Components/Fight/Fight';
import BossCards from '../Components/BossCards/BossCards';

const GameInterface = ({ route }) => {
  return (
    <div className='game-interface'>
      { (route === 'home') && <Home /> }
      { (route === 'fight') && <Fight /> }
      { (route === 'cards') && <Cards /> }
      { (route === 'bossCards') && <BossCards /> }
    </div>
  )
}

export default GameInterface;