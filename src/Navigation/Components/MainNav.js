import React from 'react';
import { soundEffects } from '../../GameInterface/Components/Fight/soundEffects';
import "./MainNav.css";

const MainNav = ({ changeRoute, route }) => {

  return (
    <nav className='main-nav'>
        <h1 onClick={() => {changeRoute('home'); soundEffects.buttonPressNav.play()}} className={ route === 'home' ? 'nav-link active' : 'nav-link'}>Home</h1>
        <h1 onClick={() => {changeRoute('fight'); soundEffects.buttonPressNav.play()}} className={ route === 'fight' ? 'nav-link active' : 'nav-link'}>Fight</h1>
        <h1 onClick={() => {changeRoute('cards'); soundEffects.buttonPressNav.play()}} className={ route === 'cards' ? 'nav-link active' : 'nav-link'}>Cards</h1>
        <h1 onClick={() => {changeRoute('bossCards'); soundEffects.buttonPressNav.play()}} className={ route === 'bossCards' ? 'nav-link active' : 'nav-link'}>Boss Cards</h1>
    </nav>
  )
}

export default MainNav;