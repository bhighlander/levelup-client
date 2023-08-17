export const getEvents = () => {
  return fetch("http://localhost:8000/events", {
    headers: {
      "Authorization": `Token ${localStorage.getItem("lu_token")}`
    }
  })
    .then(res => res.json())
}

export const createEvent = (event) => {
  return fetch("http://localhost:8000/events", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Token ${localStorage.getItem("lu_token")}`
    },
    body: JSON.stringify(event)
  })
    .then(res => res.json())
}

export const updateEvent = (event) => {
  return fetch(`http://localhost:8000/events/${event.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Token ${localStorage.getItem("lu_token")}`
    },
    body: JSON.stringify(event)
  })
}

export const getEventById = (id) => {
  return fetch(`http://localhost:8000/events/${id}`, {
    headers: {
      "Authorization": `Token ${localStorage.getItem("lu_token")}`
    }
  })
    .then(res => res.json())
}

export const deleteEvent = (id) => {
  return fetch(`http://localhost:8000/events/${id}`, {
    method: "DELETE",
    headers: {
      "Authorization": `Token ${localStorage.getItem("lu_token")}`
    }
  })
}

export const leaveEvent = (eventId) => {
  return fetch(`http://localhost:8000/events/${eventId}/leave`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Token ${localStorage.getItem("lu_token")}`
    }
  })
}

export const joinEvent = (eventId) => {
  return fetch(`http://localhost:8000/events/${eventId}/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Token ${localStorage.getItem("lu_token")}`
    },
    body: JSON.stringify(eventId)
  })
}
