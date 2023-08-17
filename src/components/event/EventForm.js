import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { createEvent } from "../../managers/EventManager";
import { getGames } from "../../managers/GameManager";

export const EventForm = () => {
  const [games, setGames] = useState([]);
  const [currentEvent, setCurrentEvent] = useState({
    event_date: "",
    location: "",
    game: "",
  });
  const navigate = useNavigate();

  useEffect(() => {
    getGames().then((games) => setGames(games));
  }
  , []);

  const changeEventState = (evt) => {
    const { name, value } = evt.target;
    setCurrentEvent({
      ...currentEvent,
      [name]: value
    });
  };


  return (
    <form className="eventForm">
      <h2 className="eventForm__title">Create Event</h2>
      <fieldset>
        <div className="form-group">
          <label htmlFor="event_date">Date</label>
          <input
            type="date"
            name="event_date"
            required
            autoFocus
            className="form-control"
            placeholder="Date"
            value={currentEvent.event_date}
            onChange={changeEventState}
          />
        </div>
      </fieldset>
      <fieldset>
        <div className="form-group">
          <label htmlFor="location">Location</label>
          <input
            type="text"
            name="location"
            required
            autoFocus
            className="form-control"
            placeholder="Location"
            value={currentEvent.location}
            onChange={changeEventState}
          />
        </div>
      </fieldset>
      <fieldset>
        <div className="form-group">
          <label htmlFor="game">Game: </label>
          <select name="game" className="form-control" onChange={changeEventState}>
            <option value="">Select a game</option>
            {games.map((game) => (
              <option key={game.id} value={game.id}>
                {game.title}
              </option>
            ))}
          </select>
        </div>
      </fieldset>
      <button
        type="submit"
        onClick={(evt) => {
          evt.preventDefault();
          const newEvent = { 
            event_date: currentEvent.event_date,
            location: currentEvent.location,
            game: currentEvent.game
          };
          createEvent(newEvent).then(() => navigate("/events"));
        }}
      >Create Event</button> 
    </form>
  );

}
