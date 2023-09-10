import React from 'react';

const SelectedComponent = ({ selectedGame, onResetSelection }) => {
  return (
    <div className='selectedGame'>
    <h1>Selected Game</h1>
      <button onClick={onResetSelection}>Change Game</button>
      <h2>{selectedGame.name}</h2>
      <img src={selectedGame.image?.small_url} alt={selectedGame.name} />
      <p>GUID: {selectedGame.guid}</p>
      <p>Description: {selectedGame.deck}</p>
    </div>
  );
};

export default SelectedComponent;