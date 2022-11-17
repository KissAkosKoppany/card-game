import React, { useEffect, useState } from 'react';
import Tilt from 'react-parallax-tilt';
import { GiCrossedSwords } from 'react-icons/gi';
import { GiBookmarklet } from 'react-icons/gi';
import { GiPadlock } from 'react-icons/gi';
import 'animate.css';
import { soundEffects } from '../soundEffects';
import { onAttackSoundEffect } from '../onAttackSoundEffect';

const FightCardsSelected = ({ dioStun, subaruDeathRound, setCardHpChangeNumber, round, setRound, stun, setTurn, setTurnAnimation, turnAnimation, turn, cardHpChangeNumber, card, basicAttackOnBoss, uniqueSkill }) => {

    // const [cardAttack, setCardAttack] = useState(card.attack);
    // const [cardHp, setCardHp] = useState(card.hp);
    const [onhitAnimation, setOnhitAnimation] = useState(false);
    const [attackChange, setAttackChange] = useState(false);
    const [attackAnimation, setAttackAnimation] = useState(false);
    const [showAttackNumber, setShowAttackNumber] = useState(false);

    function handleAttackOnBoss() {
        setAttackAnimation(true);
        onAttackSoundEffect(card.id);
        setTimeout(() => {
            basicAttackOnBoss(card.id, card.attack)
        }, 350)
        setTimeout(() => {
            if(stun.stunState === false) {
                setTurn(1)
                setTimeout(() => {
                    setTurnAnimation(1)
                }, 2500) //1500
            } else {
                setTurn(0)
                setTimeout(() => {
                    setRound(round + 1)
                    setTurnAnimation(0)
                }, 2500) //1500
            }
        }, 500) 
    }

    function handleUniqueSkill() {
        setTimeout(() => {
            uniqueSkill(card.id, card.attack, card.hp)
        }, 350)
        setTimeout(() => {
            if(stun.stunState === false) {
                setTurn(1)
                setTimeout(() => {
                    setTurnAnimation(1)
                }, 2500) //1500
            } else {
                setTurn(0)
                setTurnAnimation(0)
                setTimeout(() => {
                    setRound(round + 1)     
                }, 2500) //1500
            }
        }, 500)
    }


    useEffect(() => {
        //subaru's revive passive
        if(card.id === 15 && round - subaruDeathRound === 3) {
            card.hp = 1000
            setCardHpChangeNumber('+' + 1000)
            soundEffects.subaruRevive.play();
        };
        //luffy's passive
        if(card.id === 10) {
            let random = Math.floor(Math.random() * 100);
            if(random <= 40) card.attack = Number(card.attack) + 45;
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [round])

    // console.log(subaruDeathRound)

    useEffect(() => {
        setOnhitAnimation(true)
        setTimeout(() => {
            setOnhitAnimation(false)
        }, 500)
        setShowAttackNumber(true)
        setTimeout(() => {
            setShowAttackNumber(false)
        }, 700)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [card.hp])

    useEffect(() => {
        setAttackChange(true)
        setTimeout(() => {
            setAttackChange(false)
        }, 500)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [card.attack])


    return (
        <Tilt scale={1.1} tiltMaxAngleX={0} tiltMaxAngleY={0} >
            <GiPadlock className={`stun-chain-card ${dioStun.stunAnimation && 'on-stun'}`} />
            <div onAnimationEnd={() => setAttackAnimation(false)} className={`${card.hp === 0 ? `inactive-card` : ''} ${turnAnimation === 1 && 'onOpponentTurn'} fight-card`}>
             <div className={`${!showAttackNumber ? '' : cardHpChangeNumber.charAt(0) === '-' ? 'on-attack-card attack-number-minus animate__animated animate__fadeOutDown animate__slower' : 'on-attack-card attack-number-plus animate__animated animate__fadeOutUp animate__slower'} attack-number attack-number-card`}>{cardHpChangeNumber}</div>
                    <div className='card-content card-content-front'>
                    <div className={`stat-circle stat-circle-left ${card.theme}-dark ${attackChange ? 'onhit' : ''}`}>
                        <p className='stat-indicator'>{card.attack}</p>
                    </div>
                    <div className={`stat-circle stat-circle-right ${card.theme}-dark ${onhitAnimation ? 'onhit' : ''}`}>
                        <p className='stat-indicator'>{card.hp}</p>
                    </div>
                    <div className={`img-container ${attackAnimation ? 'animate__animated animate__tada' : ''}`}>
                        <img className={`card-img ${card.theme}`} alt='' src={`cardImg/${card.image}`} />
                    </div>
                    <div className={`inner-card ${card.theme}`}>
                        <div className='inner-card-content'>
                        <div className={`card-title-container ${card.theme}-dark`}>
                            <h1 className='card-title'>{card.name}</h1>
                        </div>
                        <div className={`card-description-container fight-icon-container ${card.theme}-dark`}>
                            <GiBookmarklet onClick={() => turn === 0 && handleUniqueSkill()} className={`fight-icon ${!card.activeskill && 'hide-icon'}`} />
                            <GiCrossedSwords onClick={() => turn === 0 && handleAttackOnBoss()} className={`fight-icon ${(card.id === 15 && card.hp ===0) || card.id === 11 ? 'hide-icon' : ''}`} />
                        </div>
                        </div>
                    </div>
                    </div>
            </div>
        </Tilt>
    )
}

export default FightCardsSelected;