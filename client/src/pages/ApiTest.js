import React, { useState, useEffect } from 'react';

const apiKey = process.env.REACT_APP_API_KEY;

function ApiTest() {
  const [search, setSearch] = useState('');
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedGame, setSelectedGame] = useState(null);

  const apiUrl = `/api/search/?api_key=${apiKey}&format=json&query=${search}`; 

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await fetch(apiUrl);
      const data = await response.json();
      setGames(data.results || []);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (search) {
      fetchData();
    }
  };

  const handleGameSelection = (selectedGame) => {
    setSelectedGame(selectedGame);
  };

  return (
    <div>
      <h1>Game Search</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter a game title"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button type="submit">Search</button>
      </form>

      {games.length > 0 && (
        <div>
          <h2>Choose a game:</h2>
          <select
            value={selectedGame ? selectedGame.name : ''}
            onChange={(e) => {
              const selectedGameName = e.target.value;
              const game = games.find((g) => g.name === selectedGameName);
              handleGameSelection(game);
            }}
          >
            <option value="">Select a game</option>
            {games.map((game) => (
              <option key={game.guid} value={game.name}>
                {game.name}
              </option>
            ))}
          </select>
        </div>
      )}

      {selectedGame && (
        <div>
          <h2>Selected Game: {selectedGame.name}</h2>
          <img src={selectedGame.image?.medium_url} alt={selectedGame.name} />
          <p>GUID: {selectedGame.guid}</p>
          <p>Description: {selectedGame.deck}</p>
        </div>
      )}

      {loading ? (
        <p>Loading...</p>
      ) : null}
    </div>
  );
}

export default ApiTest;
