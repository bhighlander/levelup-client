import React, { useEffect, useState } from "react";
import { deleteEvent, getEvents, joinEvent, leaveEvent } from "../../managers/EventManager"; // Add joinEvent and leaveEvent as required
import { useNavigate } from "react-router-dom";

export const EventList = (props) => {
  const [events, setEvents] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getEvents().then(data => setEvents(data));
  }, []);

  const handleDelete = (id) => {
    deleteEvent(id)
      .then(() => getEvents().then(setEvents));
  };

  const handleJoin = (eventId) => {
    joinEvent(eventId)
      .then(() => getEvents().then(setEvents));
  };

  const handleLeave = (eventId) => {
    leaveEvent(eventId)
      .then(() => getEvents().then(setEvents));
  };

  return (
    <>
      <article className="events">
        {
          events.map(event => {
            return <section key={`event--${event.id}`} className="event">
              <div className="event__organizer">{event.organizer.first_name}</div>
              <div className="event__attendees">{event.attendees.map(attendee => attendee.first_name).join(', ')}</div>
              <div className="event__date">{event.event_date}</div>
              <div className="event__location">{event.location}</div>
              <div className="event__game">{event.game_id.title}</div>
              {
                event.joined ?
                <button className="btn btn-3" onClick={() => handleLeave(event.id)}>Leave</button>
                :
                <button className="btn btn-3" onClick={() => handleJoin(event.id)}>Join</button>
              }
              <button className="btn btn-3" onClick={() => handleDelete(event.id)}>Delete</button>
              <br />
            </section>
          })
        }
      </article>
      <button className="btn btn-2 btn-sep icon-create"
        onClick={() => {
          navigate({ pathname: "/events/new" });
        }}
      >Register New Event</button>
    </>
  )
}
