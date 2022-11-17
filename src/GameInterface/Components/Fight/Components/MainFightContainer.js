import React, { useState, useEffect } from 'react'
import { BsFilePlusFill } from 'react-icons/bs';
import FightCardContainer from '../FightCardContainer';
import 'animate.css';
// import { GiPadlock } from 'react-icons/gi';
import { soundEffects } from '../soundEffects';
import Victory from './Victory';
import Defeat from './Defeat';
import Kyuubi from './Kyuubi';
import BeastTitan from './BeastTitan';
import Ryuk from './Ryuk';
import Dio from './Dio';

const MainFightContainer = ({ handleNextBossRouteChange, bossRoute }) => {

  const [showCards, setShowCards] = useState(false);
  const [selectedCards, setSelectedCards] = useState([]);
  const [fightingCards, setFightingCards] = useState([]);
  const [cards, setCards] = useState([]);
  const [bossAttack, setBossAttack] = useState();
  const [bossHp, setBossHp] = useState();
  const [bossHpChange, setBossHpChange] = useState(false);
  const [bossAttackAnimation, setBossAttackAnimation] = useState(false);
  const [showAttackNumber, setShowAttackNumber] = useState(false);
  const [attackNumber, setAttackNumber] = useState('');
  const [cardHpChangeNumber, setCardHpChangeNumber] = useState('');
  const [turn, setTurn] = useState(0); // if 1 player's turn, if 0 boss's turn
  const [turnAnimation, setTurnAnimation] = useState(0);
  const [round, setRound] = useState(1);
  const [roundAnimation, setRoundAnimation] = useState(false);
  const [stun, setStun] = useState({ stunState: false, stunAnimation: false, stunRound: 999 })
  const [subaruDeathRound, setSubaruDeathRound] = useState(999);
  const [refreshBattle, setRefreshBattle] = useState(false)
  const [dioStun, setDioStun] = useState({ stunState: false, stunAnimation: false, stunRound: 999})

  //stay
  useEffect(() => {
    fetch('https://cardgame.fly.dev/')
      .then(res => res.json())
      .then(data => setCards(data))
  }, [refreshBattle])

  
  //stay
  const handleCardSelect = (card) => {
    soundEffects.selectCard.play();
    setSelectedCards([...selectedCards, card])
    setFightingCards([...selectedCards, card])
  }

  // prevent boss hp to go negative
  // stay
  function handleBossHp(attack) {
    if(bossHp - attack < 0) setBossHp(0)
    else setBossHp(bossHp - attack)
  }

  // player attacking the boss with the basic attack
  //stay
  const basicAttackOnBoss = (id, cardAttack) => {
    let random = Math.floor(Math.random() * 100);
    let critDamageMultiplyer = Math.random() + 1;
    let damageMultiplayer = Math.random() + 0.5;
    switch (id) {
      case 6:
        soundEffects.goblinSlayer.play();
        if (random <= 90) cardAttack = Math.floor(Number(cardAttack) + (Number(cardAttack) * critDamageMultiplyer))
        break;
      case 13:
        if (random >= 95) {
          cardAttack = 99999;
          soundEffects.saitamaSerious.play();
        } else {
          soundEffects.saitamaNormal.play();
          cardAttack = Math.floor(cardAttack * damageMultiplayer);
        } 
        break;
      case 9:
        soundEffects.levi.play();
        let random1 = Math.floor(Math.random() * 100);
        let random2 = Math.floor(Math.random() * 100);
        let random3 = Math.floor(Math.random() * 100);
        let cardAttack1 = 0;
        let cardAttack2 = 0;
        let cardAttack3 = 0;
        if (random1 >= 50) cardAttack1 = Number(cardAttack) * critDamageMultiplyer
          else cardAttack1 = Number(cardAttack);
        if (random2 >= 50) cardAttack2 = Number(cardAttack) * critDamageMultiplyer
          else cardAttack2 = Number(cardAttack);
        if (random3 >= 50) cardAttack3 = Number(cardAttack) * critDamageMultiplyer
          else cardAttack3 = Number(cardAttack);
        cardAttack = Math.floor(cardAttack1 + cardAttack2 + cardAttack3);
        break;
      default:
        if(random <= 10) cardAttack = Math.floor(Number(cardAttack) + Number(cardAttack) * critDamageMultiplyer);
          cardAttack = Math.floor(cardAttack * damageMultiplayer); 
    }
    handleBossHp(Math.floor(Number(cardAttack)))
    setAttackNumber('-' + cardAttack)
    if(round - stun.stunRound === 2) {
      setStun({ ...stun, stunAnimation: false })
    }
  }

  // boss attacking
  const onBossAttack = () => {
    let damageMultiplayer = Math.random() + 0.5;
    let bossAttackNumber = Math.floor(bossAttack * damageMultiplayer);
    let cardToAttack = Math.floor(Math.random()*fightingCards.length);
    let hpAfterAttack = fightingCards[cardToAttack].hp - bossAttackNumber;

    //targeting subaru with 0 healt bugFix
    if(fightingCards[cardToAttack].id === 15 && fightingCards[cardToAttack].hp === 0) {
      switch(cardToAttack) {
        case 3:
          cardToAttack -= 1;
          break;
        default:
          cardToAttack += 1;
          break;
      }
    }

    switch(bossRoute) {
      case 'kyuubi':
        soundEffects.kyuubi.play();
        onBossAttackCharacterPassive(cardToAttack, bossAttackNumber, hpAfterAttack);
        setTurn(0)
        setTimeout(() => {
          setTurnAnimation(0)
          setRound(round + 1)
        }, 2000)
        break;
      case 'beastTitan':
        soundEffects.beastTitan2.play();
        let random = Math.floor(Math.random() * 100);
        if(random < 20) {
          bossAttackNumber = Math.floor(bossAttackNumber * 1.7);
          setBossHp(bossHp + 100)
          setAttackNumber('+' + 100)
        }
        onBossAttackCharacterPassive(cardToAttack, bossAttackNumber, hpAfterAttack);
        setTurn(0)
        setTimeout(() => {
          setTurnAnimation(0)
          setRound(round + 1)
        }, 2000)
        break;
      case 'ryuk':
        let random1 = Math.floor(Math.random() * 100);
        if(random1 <= 5) {
          soundEffects.ryuk1.play();
          onBossAttackCharacterPassive(cardToAttack, 99999, 0);
        } else {
          soundEffects.ryuk1.play();
          onBossAttackCharacterPassive(cardToAttack, bossAttackNumber, hpAfterAttack);
        }
        setTurn(0)
        setTimeout(() => {
          setTurnAnimation(0)
          setRound(round + 1)
        }, 2000)
        break;
      case 'dio':
        let random2 = Math.floor(Math.random() * 100);
        if(random2 < 20) {
          if(fightingCards.length) {
            soundEffects.dioStun.play()
            setDioStun({ stunState: true, stunAnimation: true, stunRound: round })
            let hpAfterAttack0 = fightingCards[0]?.hp - bossAttackNumber;
            let hpAfterAttack1 = fightingCards[1]?.hp - bossAttackNumber;
            let hpAfterAttack2 = fightingCards[2]?.hp - bossAttackNumber;
            let hpAfterAttack3 = fightingCards[3]?.hp - bossAttackNumber;
            if(fightingCards[0]?.hp !== 0) onBossAttackCharacterPassive(0, bossAttackNumber, hpAfterAttack0);
            if(fightingCards[1]?.hp !== 0) onBossAttackCharacterPassive(1, bossAttackNumber, hpAfterAttack1);
            if(fightingCards[2]?.hp !== 0) onBossAttackCharacterPassive(2, bossAttackNumber, hpAfterAttack2);
            if(fightingCards[3]?.hp !== 0) onBossAttackCharacterPassive(3, bossAttackNumber, hpAfterAttack3);
            setTurn(0)
            setTimeout(() => {
              setTurn(1)
            }, 100)
            setTimeout(() => {
              setTurnAnimation(1)
              setRound(round => round + 1)
            }, 2000)
          }
        } else {
          soundEffects.dio.play();
          onBossAttackCharacterPassive(cardToAttack, bossAttackNumber, hpAfterAttack);
          setTurn(0)
          setTimeout(() => {
            setRound(round => round + 1)
            setTurnAnimation(0)
          }, 2000)
        }
        break;
      default:
        break;
    }

    // setTurn(0)
    //     setTimeout(() => {
    //       setTurnAnimation(0)
    //       setRound(round + 1)
    //     }, 2000)

    // setBossAttackAnimation(true)
    // setTimeout(() => {
    //   setBossAttackAnimation(false)
    // }, 500)

    // if(hpAfterAttack < 0) hpAfterAttack = 0;
    // if(hpAfterAttack2 < 0) hpAfterAttack2 = 0;

     

    // onCardDeath(hpAfterAttack)
    // onCardDeath(hpAfterAttack2)

    // switch(fightingCards.length) {
    //   case 1:
    //     setFightingCards(fightCards => fightCards.filter(fightCard => fightCard.hp > 0))
    //     break;
    //   default:
    //     //subaru's passive
    //     setFightingCards(fightCards => fightCards.filter(fightCard => fightCard.hp > 0 || fightCard.id === 15))
    // }
    // setTurn(0)
    // setTimeout(() => {
    //   setTurnAnimation(0)
    //   setRound(round + 1)
    // }, 2000)
  }

  // dio stun bug fix
  useEffect(() => {
    if(dioStun.stunState) setDioStun({...dioStun, stunRound: round})
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dioStun.stunState])

  const onBossAttackCharacterPassive = (randomCard, bossAttackValue, hpAfterHit) => {
    switch (fightingCards[randomCard]?.id) {
      case 2:
        if(fightingCards.length > 2) {
          soundEffects.ayanokouji.play();
          setBossHp(bossHp - Math.floor(bossAttackValue * 0.6))
          setFightingCards(fightingCards => fightingCards.map((fightingCard) => {
            let hpAfterAttackAyanokouji = Number(fightingCard.hp) - Math.floor(bossAttackValue * 0.3);
            if(hpAfterAttackAyanokouji < 0) hpAfterAttackAyanokouji = 0;
            if(fightingCard.id !== 2) {
              setCardHpChangeNumber('-' + Math.floor(bossAttackValue * 0.3))
              return {...fightingCard, hp: hpAfterAttackAyanokouji}
            }            
              return fightingCard
        }))
          handleBossHp(Math.floor(bossAttackValue * 0.6))
          setAttackNumber('-' + (Math.floor(bossAttackValue * 0.6)))
        } else {
          setFightingCards(fightingCards => fightingCards.map(fightingCard => {
            if(fightingCard.id === 2) return {...fightingCard, hp: hpAfterHit}
            return fightingCard
          }))
        }
        break;
      case 12:
        setCardHpChangeNumber('-' + bossAttackValue)
        setTimeout(() => {
          soundEffects.mobAttackBoost.play();
        }, 1000)
        setFightingCards(fightingCards => fightingCards.map(fightingCard => {
          if(fightingCard.id === 12) return {...fightingCard, hp: hpAfterHit, attack: Math.floor(fightingCard.attack * 1.4)}
          return fightingCard
        }))
        break;
      case 15:
        setCardHpChangeNumber('-' + bossAttackValue)
        setFightingCards(fightingCards => fightingCards.map(fightingCard => {
          if(fightingCard.id === 15 && fightingCard.hp === 0) return fightingCard;
            else if(fightingCard.id === 15) {
              if(hpAfterHit === 0) setSubaruDeathRound(round)
              if(fightingCard.hp === 0) onBossAttack()
                return {...fightingCard, hp: hpAfterHit};
          }
          return fightingCard;
          })
        )
        break;
      case 17:
        setCardHpChangeNumber('-' + bossAttackValue)
        let random = Math.floor(Math.random() * 100);
        setFightingCards(fightingCards => fightingCards.map(fightingCard => {
          if(fightingCard.id === 17) {
            if(random <= 80) {
              soundEffects.zoroCounter.play(); 
              basicAttackOnBoss(17, fightingCard.attack)
              setTurn(0)
              setTimeout(() => {
                setTurnAnimation(0)
              }, 2001)
              setShowAttackNumber(true)
              setTimeout(() => {
                setShowAttackNumber(false)
            }, 2000)
            }
            return {...fightingCard, hp: hpAfterHit}
          } 
          return fightingCard
        }))
        break;
      default:
        setCardHpChangeNumber('-' + bossAttackValue)
        setFightingCards(fightingCards => fightingCards?.map(fightingCard => {
          if(fightingCard?.id === fightingCards[randomCard]?.id && fightingCards[randomCard]?.hp > 0) {
            return {...fightingCard, hp: hpAfterHit}
          }
          return fightingCard;
          })
        )
    }
    setBossAttackAnimation(true)
    setTimeout(() => {
      setBossAttackAnimation(false)
    }, 500)

    if(hpAfterHit < 0) hpAfterHit = 0;

    onCardDeath(hpAfterHit)

    switch(fightingCards.length) {
      case 1:
        setFightingCards(fightCards => fightCards.filter(fightCard => fightCard.hp > 0))
        break;
      default:
        //subaru's passive
        setFightingCards(fightCards => fightCards.filter(fightCard => fightCard.hp > 0 || fightCard.id === 15))
    }
  }

  //yuno attack boost passive after card death
  //stay
  const onCardDeath = (hp) => {  
      if(hp === 0) {
        setFightingCards(fightingCards => fightingCards.map(fightingCard => {
          if(fightingCard.id === 16) {
            return {...fightingCard, attack: Number(fightingCard.attack) + Math.floor(Number(fightingCard.attack) * 1.2)}
          }
          return fightingCard;
          })
        )
      }
  }

  // console.log(stun.stunRound, stun.stunState)


  //player's unique skill
  //stay
  const uniqueSkill = (id, cardAttack, cardHp) => {
    switch (id) {
      case 3:
        soundEffects.minato.play();
        let stunChance = Math.floor(Math.random() * 100);
        if(stunChance < 60) {
          setStun({ stunState: true, stunAnimation: true, stunRound: round})
          setTurn(0)
        } 
        break;
      case 4:
        soundEffects.erwinShinzo.play();
        let hpAfterBuff = Number(cardHp) - Math.floor(2500 * 0.4);
        if (hpAfterBuff < 0) hpAfterBuff = 0;
        setCardHpChangeNumber('-' + Math.floor(2500 * 0.4))
        setFightingCards(fightingCards => fightingCards.map(fightingCard => {
          if(fightingCard.id !== 4) return {...fightingCard, attack: Math.floor(Number(fightingCard.attack) + Number(cardAttack))}
            else return {...fightingCard, hp: hpAfterBuff}
        }))
        break;
      case 11:
        let damageMultiplayer = Math.random() + 0.7;
        soundEffects.megumin.play();
        cardAttack = Math.floor((cardAttack * damageMultiplayer) * 5);
        handleBossHp(cardAttack);
        setAttackNumber('-' + (cardAttack))
        setFightingCards(fightingCards => fightingCards.map(fightingCard => {
          if(fightingCard.id === 11) return {...fightingCard, attack: 0}
            return fightingCard
        }))
        break;
      case 14:
        soundEffects.sakamotoYareYare.play();
        setCardHpChangeNumber('+' + 150)
        setFightingCards(fightingCards => fightingCards.map(fightingCard => {
          //check if subaru is dead
          if(fightingCard.id === 15 && fightingCard.hp === 0) return fightingCard
            return {...fightingCard, hp: 150 + Number(fightingCard.hp)}
        }))
        break;
      default:
        break;
    }
    if(round - stun.stunRound === 2) {
      setStun({ ...stun, stunAnimation: false })
    }
    if(fightingCards.length) setFightingCards(fightingCard => fightingCard.filter(fightCard => fightCard.hp > 0 || fightCard.id === 15))
  }

  // minato stun bugFix
  useEffect(() => {
    if(stun.stunState) setStun({...stun, stunRound: round})
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stun.stunState])

  // console.log(round, stun.stunRound)

  // gintoki hp boost passive onLoad
  //stay
  const uniquePassive = (id) => {
    switch (id) {
      case 5:
        selectedCards.forEach(selectedCard => {
          for (let key in selectedCard) {
            if(selectedCard[key] === 5) {
              setFightingCards(fightingCards => fightingCards.map(fightingCard => {
                return {...fightingCard, hp: Number(fightingCard.hp) + Math.floor(Number(fightingCard.hp) * 0.3)}
              }))
            }
          }
        })
        break;
      default:
        break;
    }
  }

  //kyuubi attack boost passive
  //boss taking a hit animation
  useEffect(() => {
    setBossHpChange(true)
    setTimeout(() => {
        setBossHpChange(false)
    }, 1000)
    
    setShowAttackNumber(true)
    
    setTimeout(() => {
      setShowAttackNumber(false)
    }, 1500)
    //kyuubi attack boost passive
    if(bossHp < 3000 && bossRoute === 'kyuubi') setBossAttack(Math.floor(bossAttack * 1.3));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [bossHp])

  //boss attack turn
  useEffect(() => {
    if(bossHp > 0) {
      if(turn === 1) {
        if(stun.stunState === false) {   
          setTimeout(() => {
            onBossAttack()
          }, 4000)  //3000
        } else {
          setTimeout(() => {
            setTurn(0)
            setRound(round + 1)
          }, 1500) //1000
        }
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [turn])

  // console.log(turn, round, dioStun.stunRound)

  //round animation and stun
  useEffect(() => {
    // minato stun onBoss
    if(stun.stunState === true && round - stun.stunRound === 2) {
      setStun({ ...stun, stunState: false})
    }

    // if(round - stun.stunRound === 3) {
    //   setStun({ ...stun, stunAnimation: false })
    // }

    // Dio stun
    if(dioStun.stunState === true && round - dioStun.stunRound >= 1) {
      setDioStun({ ...dioStun, stunState: false})
    }

    if(round - dioStun.stunRound === 2) {
      setDioStun({...dioStun, stunAnimation: false})
    }

    // if(dioStun.stunState) {
    //   setTurn(1)
    // }

    //subaru passive
    if(fightingCards.length === 1) {
      fightingCards.map(fightingCard => {
        if(fightingCard.id === 15 && fightingCard.hp === 0) return setFightingCards([])
          return fightingCards
      })
    }
    setRoundAnimation(true)
    setTimeout(() => {
      setRoundAnimation(false);
    }, 1000)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [round])

  // refresh the battle
  const refresh = () => {
    setSelectedCards([])
    setFightingCards([])
    setRound(1)
    setTurn(0)
    setShowCards(false)
    setRefreshBattle(!refreshBattle)
    setAttackNumber('')
    setCardHpChangeNumber('')
    setStun({ stunState: false, stunAnimation: false, stunRound: 999 })
    setDioStun({ stunState: false, stunAnimation: false, stunRound: 999 })
    switch(bossRoute) {
      case 'kyuubi':
        setBossAttack(500)
        setBossHp(7000)
        break;
      case 'beastTitan':
        setBossAttack(400)
        setBossHp(9000)
        break;
      case 'ryuk':
        setBossAttack(600)
        setBossHp(8000)
        break;
      case 'dio':
        setBossAttack(700)
        setBossHp(7000)
        break;
      default:
        break;
    }
  }
  // refreshing the battle after changing the bossRoute
  useEffect(() => {
    refresh();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [bossRoute])

  // console.log(turn)
  

  return (
    <div className='boss-fight-container'>
      <div className={(bossHp === 0 || (fightingCards.length === 0 && selectedCards.length)) ? `battle-end-container` : 'hidden'}>
        { bossHp === 0 && <Victory bossHp={bossHp} handleNextBossRouteChange={handleNextBossRouteChange} /> }
        { (fightingCards.length === 0 && selectedCards.length) && <Defeat setRefreshBattle={setRefreshBattle} refresh={refresh} fightingCards={fightingCards} selectedCards={selectedCards} /> }
      </div>
        { bossRoute === 'kyuubi' && <Kyuubi turnAnimation={turnAnimation} bossHp={bossHp} bossAttack={bossAttack} stun={stun} showAttackNumber={showAttackNumber} attackNumber={attackNumber} bossHpChange={bossHpChange} bossAttackAnimation={bossAttackAnimation} />}
        { bossRoute === 'beastTitan' && <BeastTitan turnAnimation={turnAnimation} bossHp={bossHp} bossAttack={bossAttack} stun={stun} showAttackNumber={showAttackNumber} attackNumber={attackNumber} bossHpChange={bossHpChange} bossAttackAnimation={bossAttackAnimation} />}
        { bossRoute === 'ryuk' && <Ryuk turnAnimation={turnAnimation} bossHp={bossHp} bossAttack={bossAttack} stun={stun} showAttackNumber={showAttackNumber} attackNumber={attackNumber} bossHpChange={bossHpChange} bossAttackAnimation={bossAttackAnimation} />}
        { bossRoute === 'dio' && <Dio turnAnimation={turnAnimation} bossHp={bossHp} bossAttack={bossAttack} stun={stun} showAttackNumber={showAttackNumber} attackNumber={attackNumber} bossHpChange={bossHpChange} bossAttackAnimation={bossAttackAnimation} />}
      {
        (selectedCards.length === 4 && fightingCards.length >= 1) &&
        <div className={`round-indicator-container`}>
          <p className='round-indicator'>Round</p>
          <p className={`round-indicator ${roundAnimation && 'animate__animated animate__fadeInUp'}`}>{round}</p>
        </div>
      }
      <div className='card-select-container'>
        {
          showCards ? <FightCardContainer                            
                          setCards={setCards} 
                          cards={cards} 
                          selectedCards={selectedCards}
                          fightingCards={fightingCards} 
                          handleCardSelect={handleCardSelect}
                          basicAttackOnBoss={basicAttackOnBoss}
                          uniqueSkill={uniqueSkill}
                          uniquePassive={uniquePassive}
                          cardHpChangeNumber={cardHpChangeNumber}
                          turn={turn}
                          setTurn={setTurn}
                          turnAnimation={turnAnimation}
                          setTurnAnimation={setTurnAnimation} 
                          stun={stun}
                          round={round}
                          setRound={setRound}
                          setCardHpChangeNumber={setCardHpChangeNumber}
                          subaruDeathRound={subaruDeathRound}
                          dioStun={dioStun}  
                          /> 
                        :
                        <div className='select-button-container'>
                          <p>Select your cards</p>
                          <BsFilePlusFill onClick={() => {setShowCards(true); soundEffects.buttonPressSelect.play()}} className='select-button'/>
                        </div>
        }
      </div>
    </div>
  )
}

export default MainFightContainer;