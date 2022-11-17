import React from 'react';
import { GiPadlock } from 'react-icons/gi';

const BeastTitan = ({ turnAnimation, bossHp, bossAttack, stun, showAttackNumber, attackNumber, bossHpChange, bossAttackAnimation }) => {

  
  return (
    <div className='boss-container'>
        <div className={`${bossHp === 0 ? 'inactive-card' : ''} ${turnAnimation === 0 && 'onOpponentTurn'} ${stun.stunState || bossHp === 0 ? '' : 'animate__animated animate__pulse animate__infinite animate__slower'} fight-card boss-card`}>
        <div className={`${!showAttackNumber ? "" : (attackNumber?.charAt(0) === '+') ? 'attack-number-plus on-attack animate__animated animate__fadeOutUp animate__slow' : 'attack-number-minus on-attack animate__animated animate__fadeOutDown animate__slow'} attack-number attack-number-boss`}>{attackNumber}</div>
        <GiPadlock className={`stun-chain ${stun.stunAnimation && 'on-stun'}`} />
            <div className='card-content card-content-front'>
              <div className={`stat-circle stat-circle-left brown-dark`}>
                <p className='stat-indicator'>{bossAttack}</p>
              </div>
              <div className={`stat-circle stat-circle-right brown-dark ${bossHpChange ? 'onhit' : ''}`}>
                <p className='stat-indicator'>{bossHp}</p>
              </div>
              <div className={`img-container`}>
                <img className={`card-img boss-img brown ${bossAttackAnimation ? 'animate__animated animate__tada' : ''}`} alt='' src={'cardImg/beastTitan.jpg'} />
              </div>
              <div className={`inner-card brown`}>
                <div className='inner-card-content boss-title'>
                  <div className={`card-title-container brown-dark`}>
                    <h1 className='card-title'>Beast Titan</h1>
                  </div>
                </div>
              </div>
            </div>
        </div>
      </div>
  )
}

export default BeastTitan;