import React, { useState } from 'react';
import GameComponent from '../components/GameSearch';
import './ApiTest.css';


// if username id === ownerName id then display change Game button

function ApiTest() {
  
  return (
    <div className='card'>
    <div className='name'>
      map group name here
    </div>
    <div className='container'>
    <div className='game'>
      <GameComponent />
    <div>
      <h3>Members</h3>
      <ul>
        <li className='member'>map members here</li>
      </ul>
    </div>
    </div>
    

    <div className='notes'>
      <ul className='category'>
        make categories expandable, asc/desc by date, filter by user
      <div className='title'>
        map categories here
        </div>
      <li className='note'>
      map from categories' notes here
      </li>
      </ul>
    </div>
    </div>
    </div>
  );
}

export default ApiTest;
