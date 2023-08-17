import { useEffect, useState } from 'react';
import { getGameById, getGameTypes, updateGame } from '../../managers/GameManager';
import { useParams, useNavigate } from 'react-router-dom';

export const UpdateGameForm = () => {
  const [gameTypes, setGameTypes] = useState([])
  const [game, setGame] = useState({
    title: "",
    description: "",
    game_type_id: "",
  });

  const { gameId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    getGameById(gameId)
      .then(gameData => {
        setGame({
          ...gameData, game_type_id: gameData.game_type_id.id
        });
      });
  }, [gameId]);
  
  

  useEffect(() => {
    getGameTypes().then((gameTypes) => {
      setGameTypes(gameTypes);
    });
  }, []);
  

  const changeGameState = (event) => {
    const { name, value } = event.target;
    setGame({ ...game, [name]: value });
  };

  return (
    <form className="gameForm">
      <h2 className="gameForm__title">Update Game</h2>
      <fieldset>
                <div className="form-group">
                    <label htmlFor="title">Title: </label>
                    <input type="text" name="title" required autoFocus className="form-control"
                        value={game.title}
                        onChange={changeGameState}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="description">Description: </label>
                    <input type="text" name="description" required autoFocus className="form-control"
                        value={game.description}
                        onChange={changeGameState}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="game_type_id">Game Type: </label>
                    <select name="game_type_id" className="form-control"
                        value={game.game_type_id}
                        onChange={changeGameState}>
                        <option value="">Select a game type</option>
                        {gameTypes.map((gameType) => (
                          <option key={gameType.id} value={gameType.id}>
                            {gameType.label}
                          </option>
                        ))}
                    </select>
                </div>
            </fieldset>
      <button
        type="submit"
        onClick={(evt) => {
          evt.preventDefault();
          updateGame(game)
          .then(() => navigate(`/games/${gameId}`));
        }}
        
      >Update Game</button>
    </form>
  );
};
