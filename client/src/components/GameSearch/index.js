import React, { useState, useEffect, useRef } from 'react';
import './index.css';

const apiKey = process.env.REACT_APP_API_KEY;

const ApiTest = () => {
  const [selectedGame, setSelectedGame] = useState(null);
  const [search, setSearch] = useState('');
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const inputRef = useRef(null);

  const apiUrl = `/api/search/?api_key=${apiKey}&format=json&query=${search}&resources=game`;

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await fetch(apiUrl);
      const data = await response.json();
      setGames(data.results || []);
      setHighlightedIndex(-1);
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

  const handleInputChange = (e) => {
    setSearch(e.target.value);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setHighlightedIndex((prevIndex) =>
        prevIndex < games.length - 1 ? prevIndex + 1 : prevIndex
      );
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setHighlightedIndex((prevIndex) =>
        prevIndex > 0 ? prevIndex - 1 : prevIndex
      );
    } else if (e.key === 'Enter' && highlightedIndex !== -1) {
      e.preventDefault();
      handleGameClick(games[highlightedIndex]);
    }
  };

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  return (
    <div>
      {selectedGame ? (
        <div className='selectedGame'>
          <h1>Selected Game</h1>
          <button onClick={() => setSelectedGame(null)}>Change Game</button>
          <h2>{selectedGame.name}</h2>
          <img src={selectedGame.image?.small_url} alt={selectedGame.name} />
          <p>GUID: {selectedGame.guid}</p>
          <p>Description: {selectedGame.deck}</p>
        </div>
      ) : (
        <div className='searchContainer'>
          <h1>Game Search</h1>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Enter a game title"
              value={search}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              ref={inputRef}
            />
          </form>

          {loading ? (
            <p>Loading...</p>
          ) : (
            <ul>
              {games.map((game, index) => (
                <li
                  key={game.guid}
                  className={index === highlightedIndex ? 'gameList highlighted' : 'gameList'}
                  onClick={() => handleGameClick(game)}
                >
                  <h2>{game.name}</h2>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
};

export default ApiTest;