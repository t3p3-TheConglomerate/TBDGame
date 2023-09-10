import React, { useState } from 'react';
import './ApiTest.css';
import SearchComponent from '../components/ApiTestSearch';
import SelectedComponent from '../components/ApiTestSelected';

const apiKey = process.env.REACT_APP_API_KEY;

function ApiTest() {
  const [selectedGame, setSelectedGame] = useState(null);

  const handleGameSelect = (game) => {
    setSelectedGame(game);
  };

  const handleResetSelection = () => {
    setSelectedGame(null);
  };

  return (
    <div>
      {selectedGame ? (
        <SelectedComponent selectedGame={selectedGame} onResetSelection={handleResetSelection} />
      ) : (
        <SearchComponent onGameSelect={handleGameSelect} />
      )}
    </div>
  );
}

export default ApiTest;
