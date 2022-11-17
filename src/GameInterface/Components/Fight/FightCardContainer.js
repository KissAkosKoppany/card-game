import React from 'react';
import FightCard from './FightCard';
import FightCardsSelected from './Components/FightCardsSelected';
import { MdKeyboardArrowLeft } from 'react-icons/md';
import { MdKeyboardArrowRight } from 'react-icons/md';
import { soundEffects } from './soundEffects';

const FightCardContainer = ({ dioStun, subaruDeathRound, setCardHpChangeNumber, round, setRound, stun, setTurn, setTurnAnimation, turnAnimation, turn, cardHpChangeNumber, uniquePassive, uniqueSkill, fightingCards, selectedCards, handleCardSelect, setCards, cards, basicAttackOnBoss }) => {

// const [cards, setCards] = useState([]);

// useEffect(() => {
//   fetch('http://localhost:3001/cards')
//     .then(res => res.json())
//     .then(data => setCards(data))
// }, [])


  
const slideLeft = async function() {
  const slider = document.getElementById('slider');
  var scrollLeft = slider.scrollLeft - (slider.clientWidth - 400);
  return slider.scrollLeft = scrollLeft;
}
  
const slideRight = async function() {
  const slider = document.getElementById('slider');
  var scrollRight = slider.scrollLeft + (slider.clientWidth - 400);
  return slider.scrollLeft = scrollRight;
}

const handleRemoveSelectedCard = (id) => {
  setCards(cards.filter(card => card.id !== id))
}


  return (
    <>
      {
        (selectedCards.length !== 4) &&
        <div id='slider' className='card-list-container snap-inline'>
          <button onClick={() => {slideLeft(); soundEffects.flipCard.play()}} className='slide-button slide-button-left'><MdKeyboardArrowLeft /></button>
          {
            cards.map(card => {
              return <FightCard handleCardSelect={handleCardSelect} handleRemoveSelectedCard={handleRemoveSelectedCard} card={card} key={card.id}/>
            })
          }
          <button onClick={() => {slideRight(); soundEffects.flipCard.play()}} className='slide-button slide-button-right'><MdKeyboardArrowRight /></button>
        </div>
      }
      { 
        (selectedCards.length === 4) &&
            fightingCards.map(card => {
              return (
              <div onLoad={() => uniquePassive(card.id)} key={card.id} className='selected-cards-container'>
                <FightCardsSelected 
                  uniqueSkill={uniqueSkill} 
                  basicAttackOnBoss={basicAttackOnBoss}
                  cardHpChangeNumber={cardHpChangeNumber}
                  turn={turn}
                  setTurn={setTurn}
                  turnAnimation={turnAnimation}
                  setTurnAnimation={setTurnAnimation}
                  round={round}
                  setRound={setRound} 
                  stun={stun}
                  setCardHpChangeNumber={setCardHpChangeNumber}
                  subaruDeathRound={subaruDeathRound}
                  dioStun={dioStun}
                  card={card} 
                  key={card.id} 
                />
              </div>
              )
            })
          }
      
    </> 
  )
}

export default FightCardContainer;