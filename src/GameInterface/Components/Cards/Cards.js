import React, { useEffect, useState } from 'react';
import './Cards.css';
import Card from '../Card/Card';


const Cards = () => {

  const [cards, setCards] = useState([]);

  useEffect(() => {
    fetch('https://cardgame.fly.dev/')
      .then(res => res.json())
      .then(data => setCards(data))
  }, [])

  return (
    <div className='cards-container'>

      {cards.map(card => {
        return <Card card={card} key={card.id}/>
      })}

      

    </div>
  )
}

export default Cards;