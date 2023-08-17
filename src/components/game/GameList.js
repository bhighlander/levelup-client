import React, { useEffect, useState } from 'react';
import { deleteGame, getGames } from '../../managers/GameManager';
import { useNavigate } from 'react-router-dom';

export const GameList = (props) => {
  const [games, setGames] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getGames().then(data => setGames(data))
  }, []);

  const handleDelete = (id) => {
    deleteGame(id)
      .then(() => getGames().then(setGames));
  }

  return (
    <><article className="games">
      {
        games.map(game => {
          return <section key={`game--${game.id}`} className="game">
            <div className="game__title">{game.title} by {game.gamer_id.bio}</div>
            <div className="game__description">{game.description}</div>
            <div className="game__game_type_id">Game Type: {game.game_type_id.label}</div>
            <button className="btn btn-3" onClick={() => handleDelete(game.id)}>Delete</button>
            <br />
            </section>
        })
      }
    </article>
    <button className='btn btn-2 btn-sep icon-create'
      onClick={() => {
        navigate({ pathname: "/games/new" })
      }}
    >Register New Game</button>
    </>
  )
}
