import React, { useState } from "react";
import './App.css';
import NavBar from "./Navigation/Container/NavBar";
import GameInterface from "./GameInterface/Container/GameInterface";

const App = () => {

  const [route, setRoute] = useState('home');

  return(
    <>
        <div className="app">
          <NavBar changeRoute={setRoute} route={route} />
          <div className="game-body">
            <GameInterface route={route} />
          </div>
        </div>
    </>
  )
}

export default App;