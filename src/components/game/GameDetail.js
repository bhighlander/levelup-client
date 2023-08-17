import React, { useEffect, useState } from 'react'
import { getGameById } from '../../managers/GameManager'
import { useParams } from 'react-router-dom'

const GameDetail = () => {
  const [gameDetails, setGameDetails] = useState({})
  const { gameId } = useParams()

  useEffect(() => {
    getGameById(gameId).then(data => setGameDetails(data))
  }, [gameId])

  return (
    <>
    <article className="game-detail">
      <h2>{gameDetails.title}</h2>
      <p>{gameDetails.description}</p>
      {gameDetails.game_type_id && <p>{gameDetails.game_type_id.label}</p>}
      {gameDetails.gamer_id && <p>{gameDetails.gamer_id.bio}</p>}
    </article>
    </>
  )
  
}

export default GameDetail
