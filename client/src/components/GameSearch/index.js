import React, { useState, useEffect, useRef } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { UPDATE_GROUP } from '../../utils/mutations';
import { QUERY_SINGLE_GROUP, GET_ME } from "../../utils/queries";
import { useParams } from "react-router-dom";
import './index.css';
const apiKey = process.env.REACT_APP_API_KEY;

const GameComponent = () => {
  const { groupId } = useParams();
  // console.log('params check:', groupId)
  const [selectedGame, setSelectedGame] = useState(null);
  const [search, setSearch] = useState('');
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const inputRef = useRef(null);

  const apiUrl = `/api/search/?api_key=${apiKey}&format=json&query=${search}&resources=game`;

  const [updateGroup, { error }] = useMutation(UPDATE_GROUP);

  const { data: groupData, loading: groupLoading, error: groupError } = useQuery(QUERY_SINGLE_GROUP, {
    variables: { id: groupId },
  });
  // console.log('check group data', groupData);
  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await fetch(apiUrl);
      
      const text = await response.text();
      // console.log('api response: ', text);
      
      const data = JSON.parse(text);

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

  const handleGameClick = async (game) => {
    setSearch('');
    setSelectedGame(game);
    // post selected game to group game.name, game.desk, game.image.small_url using the update group mutation
    if (groupId && groupData) {
      const groupName = groupData?.group?.groupName;

      try {
        await updateGroup({
          variables: {
            _id: groupId,
            groupName,
            gameName: game.name,
            gameDescription: game.deck,
            gameImage: game.image.small_url
          },
          update: (cache, {data}) => {
            const existingGroup = cache.readQuery({ query: QUERY_SINGLE_GROUP,
              variables: { id: groupId }, 
            });

            cache.writeQuery({
              query: QUERY_SINGLE_GROUP,
              variables: { id: groupId },
              data: {
                group: {
                  ...existingGroup.group,
                  gameName: data.updateGroup.gameName,
                  gameDescription: data.updateGroup.gameDescription,
                  gameImage: data.updateGroup.gameImage
                },
              },
        });
      },
        });
      } catch (err) {
        console.error(err);
      }
    }
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
    inputRef.current?.focus();
  }, []);

  // console.log('group.gameName', groupData?.group?.gameName);

  const changeGame = async () => {
    setSearch('');
    setSelectedGame('');
    // post selected game to group game.name, game.desk, game.image.small_url using the update group mutation
    if (groupId && groupData) {
      const groupName = groupData?.group?.groupName;

      try {
        await updateGroup({
          variables: {
            _id: groupId,
            groupName,
            gameName: '',
            gameDescription: '',
            gameImage: ''
          },
        });
        window.location.reload();
      } catch (err) {
        console.error(err);
      }
    }
  };

  const { data: meData } = useQuery(GET_ME);
  // console.log('meData', meData);

  if (selectedGame) {
  return (
    <div className='selectedGame'>
      <h3>Selected Game</h3>
      {groupData?.group?.groupOwner === meData?.me?._id && (
        <button onClick={changeGame}>Change Game</button>
      )}
      <h4>{selectedGame.name}</h4>
      <img src={selectedGame.image?.small_url} alt={selectedGame.name} />
      <p>Description: {selectedGame.deck}</p>
    </div>
  );
} else if (groupData?.group?.gameName) {
    return (
      <div className='selectedGame'>
        <h4>Selected Game</h4>
        {groupData?.group?.groupOwner === meData?.me?._id && (
        <button onClick={changeGame}>Change Game</button>
      )}
        <h2>{groupData.group.gameName}</h2>
        <img src={groupData.group.gameImage} alt={groupData.group.gameName} />
        <p>Description: {groupData.group.gameDescription}</p>
      </div>
    );
  }
  
  return (
    <div className='searchContainer'>
      <h3>Game Search</h3>
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
  );
};


export default GameComponent;