import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getEventById } from '../../managers/EventManager'

function EventDetail() {
  const [eventDetails, setEventDetails] = useState({})
  const { eventId } = useParams()

  useEffect(() => {
    getEventById(eventId).then(data => setEventDetails(data))
  }, [eventId])

  return (
    <>
    <article className="event-detail">
      <h2>{eventDetails.event_date}</h2>
      <p>{eventDetails.location}</p>
      {eventDetails.game_id && <p>{eventDetails.game_id.title}</p>}
      {eventDetails.organizer && <p>{eventDetails.organizer.first_name}</p>}
      </article>
    </>
  )
}

export default EventDetail
