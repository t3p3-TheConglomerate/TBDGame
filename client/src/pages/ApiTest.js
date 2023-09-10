import React, { useState, useEffect } from 'react';
import './ApiTest.css';

const apiKey = process.env.REACT_APP_API_KEY;

function ApiTest() {
  const [search, setSearch] = useState('');
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedGame, setSelectedGame] = useState(null);

  const apiUrl = `/api/search/?api_key=${apiKey}&format=json&query=${search}&resources=game`;

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

  useEffect(() => {
    if (search) {
      fetchData();
    } else {
      setGames([]);
    }
  }, [search]);

  const handleGameClick = (game) => {
    setSearch('');
    setSelectedGame(game);
  };

  return (
    <div>
      <h1>Game Search</h1>
      <div className='searchContainer'>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter a game title"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          />
        <button type="submit">Select</button>
      </form>

      {loading ? (
          <p>Loading...</p>
          ) : (
              <ul>
          {games.map((game) => (
              <li key={game.guid} className='gameList' onClick={() => handleGameClick(game)}>
              <h2>{game.name}</h2>
            </li>
          ))}
        </ul>
      )}
      </div>

      {selectedGame && (
        <div className='selectedGame'>
          <h2>Selected Game: {selectedGame.name}</h2>
          <img src={selectedGame.image?.medium_url} alt={selectedGame.name} />
          <p>GUID: {selectedGame.guid}</p>
          <p>Description: {selectedGame.deck}</p>
        </div>
      )}
    </div>
  );
}

export default ApiTest;
