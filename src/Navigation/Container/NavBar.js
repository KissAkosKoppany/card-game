import React from 'react'
import MainNav from '../Components/MainNav';
import './NavBar.css';

const NavBar = ({ changeRoute, route }) => {
  return (
    <div className='nav-bar'>
        <MainNav changeRoute={changeRoute} route={route} />
    </div>
  )
}

export default NavBar;