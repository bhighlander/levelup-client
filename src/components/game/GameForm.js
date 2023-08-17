import { useState, useEffect } from "react"
import { useNavigate } from 'react-router-dom'
import { createGame, getGameTypes } from '../../managers/GameManager.js'


export const GameForm = () => {
    const navigate = useNavigate()
    const [gameTypes, setGameTypes] = useState([])

    const [currentGame, setCurrentGame] = useState({
        title: "",
        description: "",
        game_type: 0,
        gamer_id: 0,
    })

    useEffect(() => {
        getGameTypes().then((gameTypes) => setGameTypes(gameTypes));
    }
    , []);
  
    const changeGameState = (event) => {
      const { name, value } = event.target;
      setCurrentGame({
        ...currentGame,
        [name]: value
      });
    };

    return (
        <form className="gameForm">
            <h2 className="gameForm__title">Register New Game</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="title">Title: </label>
                    <input type="text" name="title" required autoFocus className="form-control"
                        value={currentGame.title}
                        onChange={changeGameState}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="description">Description: </label>
                    <input type="text" name="description" required autoFocus className="form-control"
                        value={currentGame.description}
                        onChange={changeGameState}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="gameTypeId">Game Type: </label>
                    <select name="gameTypeId" className="form-control"
                        value={currentGame.gameTypeId}
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

            <button type="submit"
                onClick={evt => {
                    evt.preventDefault()

                    const game = {
                        title: currentGame.title,
                        description: currentGame.description,
                        game_type: parseInt(currentGame.gameTypeId)
                    }
                    createGame(game)
                        .then(() => navigate("/"))
                }}
                className="btn btn-primary">Create</button>
        </form>
    )
}
