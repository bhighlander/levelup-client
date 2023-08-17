import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { getEventById, updateEvent } from '../../managers/EventManager'
import { getGames } from '../../managers/GameManager'

function EventUpdate() {
  const { eventId } = useParams()
  const [games, setGames] = useState([])
  const [event, setEvent] = useState({})
  const navigate = useNavigate()

  useEffect(() => {
    getEventById(eventId)
      .then(eventData => {
        setEvent({
          ...eventData, game_id: eventData.game_id.id
        });
      });
  }, [eventId])

  useEffect(() => {
    getGames().then((games) => setGames(games))
  }, [])

  const changeEventState = (evt) => {
    const { name, value } = evt.target;
    setEvent({ ...event, [name]: value });
  };
  

  return (
    <form className="eventForm">
      <h2 className='eventForm__title'>Update Event</h2>
      <fieldset>
        <div className="form-group">
          <label htmlFor="event_date">Date: </label>
          <input
            type="date"
            name="event_date"
            required
            autoFocus
            className="form-control"
            value={event.event_date}
            onChange={changeEventState}
          />
        </div>
      </fieldset>
      <fieldset>
        <div className="form-group">
          <label htmlFor="location">Location: </label>
          <input
            type="text"
            name="location"
            required
            autoFocus
            className="form-control"
            value={event.location}
            onChange={changeEventState}
          />
        </div>
      </fieldset>
      <fieldset>
        <div className="form-group">
          <label htmlFor="game_id">Game: </label>
          <select
            name="game_id"
            required
            autoFocus
            className="form-control"
            value={event.game_id && event.game_id}
            onChange={changeEventState}
          >
            <option value="">Select a game...</option>
            {games.map(game => (
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
          updateEvent(event)
          .then(() => navigate(`/events/${eventId}`));
        }}
        className="btn btn-primary"
      >
        Update Event
      </button>
    </form>
  )
}

export default EventUpdate
